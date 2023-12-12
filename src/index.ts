/**
 * Copyright 2023 Kapeta Inc.
 * SPDX-License-Identifier: MIT
 */

import { Target, Template, TypeLike } from '@kapeta/codegen-target';
import type { GeneratedAsset, SourceFile, GeneratedFile } from '@kapeta/codegen';

import prettier from 'prettier';
import Path from 'path';
import { exec } from '@kapeta/nodejs-process';
import { RESTMethod } from '@kapeta/ui-web-types';
import { BlockDefinitionSpec, Resource } from '@kapeta/schemas';
import { parseKapetaUri } from '@kapeta/nodejs-utils';

const DB_TYPES = ['kapeta/resource-type-mongodb', 'kapeta/resource-type-postgresql'];


type MapUnknown = { [key: string]: any };

function copyUnknown(from: MapUnknown, to: MapUnknown): MapUnknown {
    Object.entries(from).forEach(([key, value]) => {
        if (!(key in to)) {
            to[key] = value;
        }
    });
    return to;
}

export default class NodeJSTarget extends Target {
    constructor(options: any) {
        super(options, Path.resolve(__dirname, '../'));
    }

    mergeFile(sourceFile: SourceFile, newFile: GeneratedFile): GeneratedFile {
        if (sourceFile.filename === 'package.json') {
            // We can merge the dependencies and scripts into existing package.json without overwriting
            // the existing user adjusted content

            const target = JSON.parse(sourceFile.content);
            const newContent = JSON.parse(newFile.content);
            if (!target.dependencies) {
                target.dependencies = {};
            }

            if (!target.devDependencies) {
                target.devDependencies = {};
            }

            Object.assign(target.devDependencies, newContent.devDependencies);
            Object.assign(target.dependencies, newContent.dependencies);

            if (!target.scripts) {
                target.scripts = {};
            }
            copyUnknown(newContent.scripts, target.scripts);
            copyUnknown(newContent, target);

            return {
                ...newFile,
                content: JSON.stringify(target, null, 4),
            };
        }

        if (sourceFile.filename === '.devcontainer/devcontainer.json') {
            // We can merge the environment variables prefixed with KAPETA_ into the containerEnv
            const target = JSON.parse(sourceFile.content);
            const newContent = JSON.parse(newFile.content);
            if (!target.containerEnv) {
                target.containerEnv = {};
            }

            const containerEnv: MapUnknown = {
                ...(newContent.containerEnv ?? {}),
            };
            Object.entries(target.containerEnv).forEach(([key, value]) => {
                if (key.toLowerCase().startsWith('kapeta_')) {
                    return;
                }
                containerEnv[key] = value;
            });

            target.containerEnv = containerEnv;

            return {
                ...newFile,
                content: JSON.stringify(target, null, 4),
            };
        }

        return super.mergeFile(sourceFile, newFile);
    }

    protected _createTemplateEngine(data: any, context: any) {
        const engine = super._createTemplateEngine(data, context);
        engine.registerHelper('enumValues', (values: string[]) => {
            return Template.SafeString(
                '\t' + values.map((value) => `${value} = ${JSON.stringify(value)}`).join(',\n\t')
            );
        });

        const TypeMap: { [key: string]: string } = {
            Instance: 'InstanceValue',
            InstanceProvider: 'InstanceProviderValue',
        };

        const $fieldType = (value: TypeLike) => {
            if (!value) {
                return value;
            }

            if (typeof value !== 'string') {
                if (value.ref === 'any' || value.ref === 'any[]') {
                    return value.ref;
                }

                if (value.ref) {
                    value = value.ref.substring(0, 1).toUpperCase() + value.ref.substring(1);
                } else if (value.type) {
                    value = value.type;
                }
            }

            let type = value as string;
            let array = false;
            if (type.endsWith('[]')) {
                type = type.substring(0, type.length - 2);
                array = true;
            }

            if (type in TypeMap) {
                type = TypeMap[type];
            }

            switch (type) {
                case 'unknown':
                case 'any':
                case 'object':
                    value = `any${array ? '[]' : ''}`;
                    break;
                case 'char':
                case 'byte':
                    value = `string${array ? '[]' : ''}`;
                    break;
                case 'date':
                case 'integer':
                case 'int':
                case 'float':
                case 'double':
                case 'long':
                case 'short':
                    value = `number${array ? '[]' : ''}`;
                    break;
                default:
                    value = `${type}${array ? '[]' : ''}`;
                    break;
            }

            return Template.SafeString(value as string);
        };
        engine.registerHelper('fieldtype', $fieldType);
        engine.registerHelper('returnType', (value) => {
            if (!value) {
                return 'void';
            }

            return $fieldType(value);
        });

        engine.registerHelper('consumes-databases', function (this: any, options) {
            const consumers = context.spec.consumers;

            if (!consumers || consumers.length === 0) {
                return '';
            }

            if (
                consumers.some((consumer: any) => {
                    return DB_TYPES.some((dbType) => consumer.kind.includes(dbType));
                })
            ) {
                return options.fn(this);
            }

            return '';
        });

        engine.registerHelper('ifValueType', (type, options) => {
            if ((type?.type || type?.ref) && type?.type?.toLowerCase() !== 'void') {
                return Template.SafeString(options.fn());
            }
            return Template.SafeString('');
        });

        engine.registerHelper('expressPath', (path) => {
            return path.replace(/\{([^}]+)}/g, ':$1');
        });

        const $toTypeMap = (method: RESTMethod, transport: string) => {
            if (!method.arguments) {
                return Template.SafeString('void');
            }

            const pathArguments = Object.entries(method.arguments).filter(
                ([key, value]) => value.transport && value.transport.toLowerCase() === transport.toLowerCase()
            );

            if (pathArguments.length === 0) {
                return Template.SafeString('void');
            }

            return Template.SafeString(
                '{' + pathArguments.map(([key, value]) => `'${key}': ${$fieldType(value)}`).join(', ') + '}'
            );
        };

        engine.registerHelper('paramsMap', (method: RESTMethod) => {
            return $toTypeMap(method, 'path');
        });

        engine.registerHelper('toArray', (...value: any[]) => {
            return value.slice(0, value.length - 1);
        });

        engine.registerHelper('usesAnyOf', (kinds: string[], options) => {
            const data = context.spec as BlockDefinitionSpec;
            const usesAny = kinds.some((kind) => {
                const uri = parseKapetaUri(kind);
                const matcher = (consumer: Resource) => parseKapetaUri(consumer.kind).fullName === uri.fullName;
                return data.consumers?.some(matcher) || data.providers?.some(matcher);
            });

            if (usesAny) {
                return options.fn(this);
            }

            return options.inverse(this);
        });

        engine.registerHelper('queryMap', (method: RESTMethod) => {
            return $toTypeMap(method, 'query');
        });

        engine.registerHelper('bodyType', (method: RESTMethod) => {
            if (!method.arguments) {
                return Template.SafeString('void');
            }

            const bodyArgument = Object.entries(method.arguments).find(
                ([key, value]) => value.transport && value.transport.toLowerCase() === 'body'
            );

            if (!bodyArgument || !bodyArgument[1]) {
                return Template.SafeString('void');
            }

            return $fieldType(bodyArgument[1]);
        });

        return engine;
    }

    protected _postProcessCode(filename: string, code: string) {
        let parser = null;
        let tabWidth = 4;

        if (filename.endsWith('.json')) {
            parser = 'json';
        }

        if (filename.endsWith('.js')) {
            parser = 'babel';
        }

        if (filename.endsWith('.ts')) {
            parser = 'babel-ts';
        }

        if (filename.endsWith('.yaml') || filename.endsWith('.yml')) {
            parser = 'yaml';
            tabWidth = 2;
        }

        if (!parser) {
            return code;
        }

        try {
            return prettier.format(code, {
                tabWidth: tabWidth,
                printWidth: 120,
                proseWrap: "never",
                singleQuote: true,
                parser: parser,
            });
        } catch (e) {
            console.log('Failed to prettify source: ' + filename + '. ' + e);
            return code;
        }
    }

    generate(data: any, context: any): GeneratedFile[] {
        return super.generate(data, context);
    }

    async postprocess(targetDir: string, files: GeneratedAsset[]): Promise<void> {
        const packageJsonChanged = files.some((file) => file.filename === 'package.json');

        if (packageJsonChanged) {
            console.log('Running npm install in %s', targetDir);
            const child = exec('npm install', {
                cwd: targetDir,
            });

            await child.wait();

            console.log('install done');
        }
    }
}

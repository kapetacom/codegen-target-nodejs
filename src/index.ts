/**
 * Copyright 2023 Kapeta Inc.
 * SPDX-License-Identifier: MIT
 */

import { Target, Template, TypeLike } from '@kapeta/codegen-target';
import type { GeneratedAsset, SourceFile, GeneratedFile } from '@kapeta/codegen';

import prettier from 'prettier';
import Path from 'path';
import { exec } from '@kapeta/nodejs-process';

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

export default class NodeJS9Target extends Target {
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

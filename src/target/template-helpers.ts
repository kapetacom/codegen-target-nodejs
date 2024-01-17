/**
 * Copyright 2023 Kapeta Inc.
 * SPDX-License-Identifier: MIT
 */
import Handlebars = require('handlebars');
import {parseEntities, Template, TypeLike} from '@kapeta/codegen-target';
import { HelperOptions } from 'handlebars';
import { RESTMethod } from '@kapeta/ui-web-types';
import { parseKapetaUri } from '@kapeta/nodejs-utils';
import {
    DataTypeReader,
    DSLData, DSLDataType,
    DSLEntity,
    ucFirst,
    DSLReferenceResolver,
    TypescriptWriter
} from '@kapeta/kaplang-core';

const DB_TYPES = ['kapeta/resource-type-mongodb', 'kapeta/resource-type-postgresql'];
export type HandleBarsType = typeof Handlebars;

export const addTemplateHelpers = (engine: HandleBarsType, data: any, context: any): void => {

    const TypeMap: { [key: string]: string } = {
        Instance: 'InstanceValue',
        InstanceProvider: 'InstanceProviderValue',
    };

    let parsedEntities: DSLData[] | undefined = undefined;
    function getParsedEntities(): DSLData[] {
        if (!parsedEntities &&
            context.spec?.entities?.source?.value) {
            parsedEntities = parseEntities(context.spec?.entities?.source?.value);
        }

        if (!parsedEntities) {
            return [];
        }

        return parsedEntities as DSLData[];
    }

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

        switch (type.toLowerCase()) {
            case 'unknown':
            case 'any':
            case 'object':
                value = `any${array ? '[]' : ''}`;
                break;
            case 'char':
            case 'byte':
                // either way will be converted to a string
                value = 'string';
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

        return Template.SafeString(value);
    };

    engine.registerHelper('enumValues', (values: string[]) => {
        return Template.SafeString('\t' + values.map((value) => `${value} = ${JSON.stringify(value)}`).join(',\n\t'));
    });

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
            '{' +
                pathArguments
                    .map(([key, value]) => `'${key}'${value.optional ? '?' : ''}: ${$fieldType(value).toString()}`)
                    .join(', ') +
                '}'
        );
    };

    engine.registerHelper('paramsMap', (method: RESTMethod) => {
        return $toTypeMap(method, 'path');
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

    engine.registerHelper('fullName', (value: string) => {
        const uri = parseKapetaUri(value);
        return uri.fullName;
    });

    engine.registerHelper('typescript-imports-dto', function (this: DSLEntity, options: HelperOptions) {
        const entities = getParsedEntities();
        const resolver = new DSLReferenceResolver();
        const referencesEntities = resolver.resolveReferencesFrom([this], entities);

        if (referencesEntities.length === 0) {
            return '';
        }

        return Template.SafeString(
            referencesEntities
                .map((entity) => {
                    const native = DataTypeReader.getNative(entity);
                    if (native) {
                        return `import { ${entity.name} } from "${native}";`;
                    }

                    return `import { ${ucFirst(entity.name)} } from 'generated:entities/${ucFirst(entity.name)}';`;
                })
                .join('\n')
        );
    });

    engine.registerHelper('typescript-imports-config', function (this: DSLEntity, options: HelperOptions) {
        const entities = getParsedEntities();
        const resolver = new DSLReferenceResolver();
        const referencesEntities = resolver.resolveReferencesFrom([this], entities);

        if (referencesEntities.length === 0) {
            return '';
        }

        return Template.SafeString(
            referencesEntities
                .map((entity) => {
                    const native = DataTypeReader.getNative(entity);
                    if (native) {
                        return `import { ${entity.name} } from "${native}";`;
                    }

                    return `import { ${ucFirst(entity.name)}Config } from './${ucFirst(entity.name)}';`;
                })
                .join('\n')
        );
    });

    engine.registerHelper('typescript-dto', (entity: DSLData) => {
        const writer = new TypescriptWriter();

        try {
            return Template.SafeString(writer.write([entity]));
        } catch (e) {
            console.warn('Failed to write entity', entity);
            throw e;
        }
    });

    engine.registerHelper('typescript-config', (entity: DSLData) => {
        const writer = new TypescriptWriter();

        try {
            // All config entities are postfixed with Config
            const copy = {...entity, name: entity.name + 'Config'};
            return Template.SafeString(writer.write([copy]));
        } catch (e) {
            console.warn('Failed to write entity', entity);
            throw e;
        }
    });
};

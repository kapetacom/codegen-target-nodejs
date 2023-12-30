/**
 * Copyright 2023 Kapeta Inc.
 * SPDX-License-Identifier: MIT
 */
import Handlebars = require('handlebars');
import { Template, TypeLike } from '@kapeta/codegen-target';
import { BlockDefinitionSpec, Resource } from '@kapeta/schemas';
import { RESTMethod } from '@kapeta/ui-web-types';
import { parseKapetaUri } from '@kapeta/nodejs-utils';

const DB_TYPES = ['kapeta/resource-type-mongodb', 'kapeta/resource-type-postgresql'];
export type HandleBarsType = typeof Handlebars;

export const addTemplateHelpers = (engine: HandleBarsType, data: any, context: any): void => {
    engine.registerHelper('enumValues', (values: string[]) => {
        return Template.SafeString('\t' + values.map((value) => `${value} = ${JSON.stringify(value)}`).join(',\n\t'));
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

        return Template.SafeString(value);
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
            '{' + pathArguments.map(([key, value]) => `'${key}': ${$fieldType(value).toString()}`).join(', ') + '}'
        );
    };

    engine.registerHelper('paramsMap', (method: RESTMethod) => {
        return $toTypeMap(method, 'path');
    });

    engine.registerHelper('toArray', (...value: any[]) => {
        return value.slice(0, value.length - 1);
    });

    engine.registerHelper('usesAnyOf', (kinds: string[], options) => {
        const blockSpec = context.spec as BlockDefinitionSpec;
        const usesAny = kinds.some((kind) => {
            const uri = parseKapetaUri(kind);
            const matcher = (consumer: Resource) => parseKapetaUri(consumer.kind).fullName === uri.fullName;
            return blockSpec.consumers?.some(matcher) || blockSpec.providers?.some(matcher);
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
};

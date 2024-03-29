/**
 * Copyright 2023 Kapeta Inc.
 * SPDX-License-Identifier: MIT
 */
import Handlebars = require('handlebars');
import { parseEntities, Template } from '@kapeta/codegen-target';
import { HelperOptions } from 'handlebars';
import { parseKapetaUri } from '@kapeta/nodejs-utils';
import {
    DataTypeReader,
    DSLData,
    DSLEntity,
    ucFirst,
    DSLReferenceResolver,
    TypescriptWriter,
    DSLType,
    asComplexType,
    RESTMethodReader,
    RESTMethodParameterReader,
    DSLEntityType,
    DSLDataTypeProperty,
} from '@kapeta/kaplang-core';
import { includes } from '../includes';
import { lowerFirst, upperFirst } from 'lodash';
import * as prettier from 'prettier';

const DB_TYPES = ['kapeta/resource-type-mongodb', 'kapeta/resource-type-postgresql'];
export type HandleBarsType = typeof Handlebars;

export const addTemplateHelpers = (engine: HandleBarsType, data: any, context: any): void => {
    const TypeMap: { [key: string]: string } = {
        Instance: 'InstanceValue',
        InstanceProvider: 'InstanceProviderValue',
    };

    let parsedEntities: DSLData[] | undefined = undefined;
    function getParsedEntities(): DSLData[] {
        if (!parsedEntities) {
            const code: string[] = [includes().source];
            if (context.spec?.entities?.source?.value) {
                code.push(context.spec?.entities?.source?.value);
            }
            parsedEntities = parseEntities(code.join('\n\n'));
        }

        if (!parsedEntities) {
            return [];
        }

        return parsedEntities as DSLData[];
    }

    const resolvePath = (path: string, options: HelperOptions) => {
        let fullPath = path;
        if (options.hash.base) {
            let baseUrl: string = options.hash.base;
            while (baseUrl.endsWith('/')) {
                baseUrl = baseUrl.substring(0, baseUrl.length - 1);
            }
            if (!fullPath.startsWith('/')) {
                fullPath = '/' + fullPath;
            }

            fullPath = baseUrl + fullPath;
        }
        return fullPath;
    };

    engine.registerHelper('valueType', (value: DSLType) => {
        const type = asComplexType(value);
        if (TypeMap[type.name]) {
            type.name = TypeMap[type.name];
        }
        return Template.SafeString(TypescriptWriter.toTypeCode(type));
    });

    engine.registerHelper('returnType', (value: DSLType) => {
        if (!value) {
            return 'void';
        }

        return Template.SafeString(TypescriptWriter.toTypeCode(value));
    });

    engine.registerHelper('path', resolvePath);

    engine.registerHelper('enumName', (name: string) => {
        return Template.SafeString(name.replaceAll(/[^a-z0-9]+/gi, '_').toUpperCase());
    });

    engine.registerHelper('join', (values: string[], separator: string = ',') => {
        return Template.SafeString(Array.from(values).join(separator));
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

    engine.registerHelper('expressPath', (path, options: HelperOptions) => {
        let fullPath = resolvePath(path, options);

        return fullPath.replace(/\{([^}]+)}/g, ':$1');
    });

    const $toTypeMap = (method: RESTMethodReader, transport: string) => {
        if (!method.parameters) {
            return Template.SafeString('void');
        }

        const transportArgs: RESTMethodParameterReader[] = method.parameters.filter(
            (value: RESTMethodParameterReader) =>
                value.transport && value.transport.toLowerCase() === transport.toLowerCase()
        );

        if (transportArgs.length === 0) {
            return Template.SafeString('void');
        }

        return Template.SafeString(
            '{' +
                transportArgs
                    .map(
                        (value) =>
                            `'${value.name}'${value.optional ? '?' : ''}: ${TypescriptWriter.toTypeCode(value.type)}`
                    )
                    .join(', ') +
                '}'
        );
    };

    engine.registerHelper('paramsMap', (method: RESTMethodReader) => {
        return $toTypeMap(method, 'path');
    });

    engine.registerHelper('queryMap', (method: RESTMethodReader) => {
        return $toTypeMap(method, 'query');
    });

    engine.registerHelper('bodyType', (method: RESTMethodReader) => {
        if (!method.parameters) {
            return Template.SafeString('void');
        }

        const bodyArgument = method.parameters.find(
            (value) => value.transport && value.transport.toLowerCase() === 'body'
        );

        if (!bodyArgument) {
            return Template.SafeString('void');
        }

        return TypescriptWriter.toTypeCode(bodyArgument.type);
    });

    engine.registerHelper('fullName', (value: string) => {
        const uri = parseKapetaUri(value);
        return uri.fullName;
    });

    engine.registerHelper('typescript-imports-dto', function (arg: DSLEntity) {
        const entities = getParsedEntities();
        const resolver = new DSLReferenceResolver();
        const referencesEntities = resolver.resolveReferencesFrom([arg], entities);
        const name = arg.type !== DSLEntityType.COMMENT ? arg.name : '';

        if (referencesEntities.length === 0) {
            return '';
        }

        return Template.SafeString(
            referencesEntities
                // skip importing self
                .filter((entity) => entity.name !== name)
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

    engine.registerHelper('typescript-imports-config', function (arg: DSLEntity) {
        const entities = getParsedEntities();
        const resolver = new DSLReferenceResolver();
        const referencesEntities = resolver.resolveReferencesFrom([arg], entities);
        const name = arg.type !== DSLEntityType.COMMENT ? arg.name : '';

        if (referencesEntities.length === 0) {
            return '';
        }

        return Template.SafeString(
            referencesEntities
                // skip importing self
                .filter((entity) => entity.name !== name)
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

        // Rename the entity and its properties to add the Config suffix
        // Recursive checking needed for in case the entity is recursive
        const renameEntityAndProps = (e: DSLData): DSLData => {
            const original = e.name;
            const newName = e.name + 'Config';

            function renameRecursive(prop: DSLDataTypeProperty): DSLDataTypeProperty {
                if (typeof prop.type === 'object') {
                    if (prop.type.name === original) {
                        prop.type.name = newName;
                    }
                    return {
                        ...prop,
                        properties: prop.properties?.map(renameRecursive),
                    };
                }
                return prop;
            }
            if (e.type !== DSLEntityType.DATATYPE) {
                return e;
            }

            return {
                ...e,
                name: newName,
                properties: e.properties?.map(renameRecursive),
            };
        };

        try {
            // All config entities are postfixed with Config
            const copy = renameEntityAndProps(entity);
            return Template.SafeString(writer.write([copy]));
        } catch (e) {
            console.warn('Failed to write entity', entity);
            throw e;
        }
    });

    engine.registerHelper('lowerFirst', function (typename) {
        return new engine.SafeString(lowerFirst(typename));
    });

    engine.registerHelper('upperFirst', function (typename) {
        return new engine.SafeString(upperFirst(typename));
    });

    engine.registerHelper('prettier', function (this: any, options) {
        // Get the content inside the {{#prettier}}...{{/prettier}} block
        const content = options.fn(this);

        const prettierOptions = {
            parser: 'typescript',
            printWidth: 120,
            proseWrap: 'never',
            singleQuote: true,
            tabWidth: 4,
            // Overwrite with Prettier options from the helper's hash arguments
            ...options.hash,
        };

        try {
            const formattedContent = prettier.format(content, prettierOptions);

            return new engine.SafeString(formattedContent);
        } catch (error) {
            console.error('Error formatting content with Prettier:', error);
            // Return unformatted content on error
            return new engine.SafeString(content);
        }
    });
};

import { CodeFormatter, TypeLike } from '@kapeta/codegen-target';

function camelCase(value: string): string {
    return value.replace(/[^a-zA-Z0-9]([a-z])/g, (g) => g[1].toUpperCase());
}

export class NodeJSTargetFormatter extends CodeFormatter {
    /**
     * Ensure that the type is camelCased for JavaScript
     */
    $type(value?: TypeLike | undefined): string {
        if (typeof value === 'string') {
            return camelCase(value);
        }
        return super.$type(value);
    }
}

import {Target, Template, GeneratedFile} from '@kapeta/codegen-target';
import prettier from "prettier";
import Path from "path";

export default class NodeJS9Target extends Target {

    constructor(options:any) {
        super(options, Path.resolve(__dirname,'../'));
    }

    protected _createTemplateEngine(data:any, context:any) {
        const engine = super._createTemplateEngine(data, context);
        engine.registerHelper('enumValues', (values:string[]) => {
            return Template.SafeString('\t' + values.map(value => `${value} = ${JSON.stringify(value)}`).join(',\n\t'));
        });

        const $fieldType = (value:any) => {
            if (!value) {
                return value;
            }

            if (value.ref) {
                value = value.ref.substring(0,1).toUpperCase() + value.ref.substring(1);
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
        return engine;
    }

    protected _postProcessCode(filename:string, code:string) {
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

        if (filename.endsWith('.yaml') ||
            filename.endsWith('.yml')) {
            parser = 'yaml';
            tabWidth = 2;
        }

        if (!parser) {
            return code;
        }

        try {
            return prettier.format(code, {
                tabWidth: tabWidth,
                parser: parser
            });
        } catch (e) {
            console.log('Failed to prettify source: ' + filename + '. ' + e);
            return code;
        }
    }

    generate(data: any, context: any): GeneratedFile[] {
        return super.generate(data, context);
    }

}

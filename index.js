const {Target, Template} = require('@kapeta/codegen-target');
const prettier = require("prettier");

class NodeJS9Target extends Target {

    constructor(options) {
        super(options, __dirname);
    }

    _createTemplateEngine(data, context) {
        const engine = super._createTemplateEngine(data, context);
        engine.registerHelper('enumValues', (values) => {
            return Template.SafeString('\t' + values.map(value => `${value} = ${JSON.stringify(value)}`).join(',\n\t'));
        });

        const $fieldType = (value) => {
            if (!value) {
                return value;
            }

            if (value.$ref) {
                value = value.$ref.substring(0,1).toUpperCase() + value.$ref.substring(1);
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

    _postProcessCode(filename, code) {
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

}

module.exports = NodeJS9Target;

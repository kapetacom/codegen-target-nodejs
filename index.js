const {Target} = require('@blockware/codegen-target');
const prettier = require("prettier");

class NodeJS9Target extends Target {

    constructor(options) {
        super(options, __dirname);
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

Target.TYPES['POSTGRES_CLIENT'] = 'postgres_client';
Target.TYPES['MONGODB_CLIENT'] = 'mongodb_client';

Target.TEMPLATES['sqldb.blockware.com/v1/postgresql'] = Target.TYPES.POSTGRES_CLIENT;
Target.TEMPLATES['nosql.blockware.com/v1/mongodb'] = Target.TYPES.MONGODB_CLIENT;

module.exports = NodeJS9Target;
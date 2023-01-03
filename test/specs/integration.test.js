const {describe, test, beforeEach} =  require("@jest/globals");

const Target = require('../../index');
const {CodegenHelpers, BlockCodeGenerator} = require('@blockware/codegen');
const Path = require("path");
const data = require("../resources/examples/todo.blockware.yml");

describe('blocks', () => {
    let target;

    beforeEach(() => {
        target = new Target({});
    })

    test('todo', async () => {

        const basedir = Path.resolve(__dirname, '../resources/examples/todo');
        const data = require('../resources/examples/todo.blockware.yml');

        return CodegenHelpers.testCodeGenFor(target, new BlockCodeGenerator(data), basedir);
    });

    test('users', async () => {

        const basedir = Path.resolve(__dirname, '../resources/examples/users');
        const data = require('../resources/examples/users.blockware.yml');

        return CodegenHelpers.testCodeGenFor(target, new BlockCodeGenerator(data), basedir);
    });
})
const {describe, test, beforeEach} =  require("@jest/globals");

const Target = require('../../index');
const {CodegenHelpers} = require('@blockware/codegen');
const Path = require("path");

describe('blocks', () => {
    let target;

    beforeEach(() => {
        target = new Target({});
    })

    test('todo', async () => {

        const basedir = Path.resolve(__dirname, '../resources/examples/todo');
        const data = require('../resources/examples/todo.block.yml');

        return CodegenHelpers.testCodeGenFor(target, data, basedir);
    });

    test('users', async () => {

        const basedir = Path.resolve(__dirname, '../resources/examples/users');
        const data = require('../resources/examples/users.block.yml');

        return CodegenHelpers.testCodeGenFor(target, data, basedir);
    });
})
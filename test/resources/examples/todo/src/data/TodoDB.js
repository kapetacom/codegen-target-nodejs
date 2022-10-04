//
// GENERATED SOURCE - DO NOT EDIT
//
const { MongoDB } = require("@blockware/sdk-nosql-mongodb");

class TodoDB extends MongoDB {
    constructor() {
        super("todo");
    }
}

module.exports = new TodoDB();

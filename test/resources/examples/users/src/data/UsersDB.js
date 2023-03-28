//
// GENERATED SOURCE - DO NOT EDIT
//
const { PostgresDB } = require("@kapeta/sdk-sqldb-postgresql");

class UsersDB extends PostgresDB {
    constructor() {
        super("users");
    }
}

module.exports = new UsersDB();

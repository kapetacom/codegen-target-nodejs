//
// GENERATED SOURCE - DO NOT EDIT
//
const { PostgresDB } = require("@blockware/sdk-sqldb-postgresql");

class UsersDB extends PostgresDB {
    constructor() {
        super("users");
    }
}

module.exports = new UsersDB();

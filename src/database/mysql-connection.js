"use strict";

const mysql2 = require("mysql2/promise");

let pool = null;
function createPool(database) {
    console.log("Connecting to Data Base");
    const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD } = process.env;
    console.log("Asking for permission...");
    return mysql2.createPool({
        connectionLimit: 15,
        host: MYSQL_HOST,
        user: MYSQL_USER,
        database: database,
        password: MYSQL_PASSWORD,
    });
}

function getConnection() {
    if (!pool) {
        const { MYSQL_DATABASE } = process.env;
        pool = createPool(MYSQL_DATABASE);
    }
    return pool;
}

module.exports = { createPool, getConnection };

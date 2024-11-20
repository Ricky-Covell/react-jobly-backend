"use strict";
/** Database setup for jobly. */

const { Client } = require("pg");
const { getDatabaseUri } = require("./config");
const fs = require('fs')

let db;

if (process.env.NODE_ENV === "production") {
  db = new Client({
    connectionString: getDatabaseUri(),
    // connectionString: `postgresql:///${getDatabaseUri()}`,
    ssl: {
      rejectUnauthorized: false
    }
  });
} else {
  db = new Client({
    connectionString: getDatabaseUri()
    // connectionString: `postgresql:///${getDatabaseUri()}`
  });
}

db.connect();

module.exports = db;
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

const seedQuery = fs.readFileSync('./jobly.sql', { encoding: 'utf8' })
db.query(seedQuery, (err, res) => {
    console.log(err, res)
    console.log('Seeding Completed!')
    db.end()
})

db.connect();

module.exports = db;
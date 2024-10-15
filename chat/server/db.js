const { Pool } = require('pg');

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "mydb",
    password: "ramin1998",
    port: 5432,
});

module.exports = pool;
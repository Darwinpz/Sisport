
const {Pool} = require("pg");

const pool = new Pool({

    user: 'postgres',
    host: 'localhost',
    password: 'postgres',
    database: 'sisport_2020',
    port: '5432'

});

module.exports = pool;
const dotenv = require('dotenv');

const { Pool } = require('pg');

dotenv.config();

const pool = new Pool ({
    connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
    console.log('Connection to Postgres Successful');
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};
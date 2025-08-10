const knex = require('knex');
const knexConfig = require('./knexfile');

const pool = knex(knexConfig.development);

module.exports = pool;
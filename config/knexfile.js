require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    },
    migrations: {
      directory: './db/migrations' 
    },
    seeds: {
      directory: './db/seeds' 
    },
    pool: { 
      min: 2,
      max: 10
    }
  },
  
  // production: {
  //   client: 'pg',
  //   connection: process.env.DATABASE_URL, // Often a single URL in production environments
  //   migrations: {
  //     directory: './db/migrations'
  //   },
  //   seeds: {
  //     directory: './db/seeds'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   }
  // }
};
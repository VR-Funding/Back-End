module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/db.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
      tableName: 'dbmigrations'
    },
    seeds: {
      directory: './database/seeds'
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      }
    }
  },
  testing: {
    client: 'sqlite3',
    connection: {
      filename: './database/db.db3'
    },
    pool: {
      min: 2,
      max: 10,
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      }
    },
    migrations: {
      directory: './database/migrations',
      tableName: 'dbmigrations'
    },
    seeds: {
      directory: './database/seeds'
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    connection: 'postgres://localhost',
    // connection: {
    //   host: 'db.ourcompany.com',
    //   user: 'me',
    //   password: 'mini me',
    //   database: 'school'
    // }
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './database/migrations',
      tableName: 'dbmigrations'
    },
    seeds: {
      directory: './database/seeds'
    }
  }
};
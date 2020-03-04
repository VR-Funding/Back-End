module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/venture.db3'
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
      filename: './database/venture.db3'
    },
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
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
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

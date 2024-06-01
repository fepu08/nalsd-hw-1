import { Sequelize } from 'sequelize';
import { client } from './pg-config';

export const sequelize = new Sequelize({
  host: client.host,
  port: client.port,
  username: client.user,
  password: client.password,
  database: client.database,
  dialect: 'postgres',
  pool: {
    max: 20,
    min: 10,
    acquire: 30000, // maximum time, in milliseconds, that pool will try to get connection before throwing error
    idle: 10000, // maximum time, in milliseconds, that a connection can be idle before being released
  },
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

sequelize.addHook('afterConnect', (connection: unknown, config: unknown) => {
  console.log('Database connection established');
});

sequelize.addHook('beforeDisconnect', (connection: unknown) => {
  console.log('Database connection about to be disconnected');
});

sequelize.addHook('afterDisconnect', (connection: unknown) => {
  console.log('Database connection disconnected');
});

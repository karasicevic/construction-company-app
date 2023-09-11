const { Sequelize } = require('sequelize');

// Replace these values with your database configuration
const databaseName = 'fpis';
const username = 'andjela';
const password = 'andjela';
const host = 'localhost'; 

const sequelize = new Sequelize(databaseName, username, password, {
  host: host,
  dialect: 'mysql'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
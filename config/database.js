
require('dotenv').config();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.host,
  port: process.env.postgreSQLport,
  username: process.env.username,
  password: process.env.password,
  database: process.env.database_name,
  define: {
    timestamps: true,
    underscored: true,
  },
});


module.exports = sequelize;

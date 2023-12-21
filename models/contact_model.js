
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const Contact = sequelize.define('Contact', {
  contact_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact_phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Contact;

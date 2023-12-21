
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 
const UserProfile = require("../models/user_model");



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

// Define the association: Contact belongs to one User
Contact.belongsTo(UserProfile, { foreignKey: 'user_id' });

// Define the inverse association: User has many Contacts
UserProfile.hasMany(Contact, { foreignKey: 'user_id' });




module.exports = Contact;

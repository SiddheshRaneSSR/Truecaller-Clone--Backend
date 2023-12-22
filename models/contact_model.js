
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const user = require('../models/user_model');

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

// // Define the association: Contact belongs to one UserProfile
// Contact.belongsTo(user, { foreignKey: 'USERID' });

// // Define the inverse association: UserProfile has many Contacts
// user.hasMany('Contact', { foreignKey: 'USERID' });


Contact.associate = models =>{
  Contact.belongsTo(models.user_model,{
    foreignKey: 'USERID'

  })
}









module.exports = Contact;

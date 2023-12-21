
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a sequelize instance
const bcrypt = require('bcrypt');
const Contact = require('../models/contact_model');
const SpamReport = require('../models/SpamReport_model');

const UserProfile = sequelize.define('UserProfile', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


UserProfile.hasMany(Contact, { foreignKey: 'user_id' });
UserProfile.hasMany(SpamReport, { foreignKey: 'reporter_id' });


// Hash password before saving
UserProfile.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});

module.exports = UserProfile;

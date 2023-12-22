
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 
const user = require("../models/user_model");
const SpamReport = sequelize.define('SpamReport', {
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  
});

SpamReport.associate = models =>{
  SpamReport.belongsTo(models.user_model,{
    foreignKey: 'USERID'

  })
}

module.exports = SpamReport;

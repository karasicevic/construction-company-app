const { DataTypes } = require('sequelize');
const sequelize = require('../Config/database');

const City = sequelize.define('city', {
  zipCode: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
   name:{
    type: DataTypes.STRING,
    allowNull: false,
   }
},
{
  timestamps: false, 
  tableName: 'city',
  freezeTableName: true
});

module.exports = City;
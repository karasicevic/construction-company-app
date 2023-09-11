const { DataTypes } = require('sequelize');
const sequelize = require('../Config/database');

const Number = sequelize.define('number', {
    streetId:{
       primaryKey: true,
       type: DataTypes.INTEGER,
       allowNull: false,
    },
    cityId: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
   number:{
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
   }
},
{
  timestamps: false, 
  tableName: 'numbers',
  freezeTableName: true
});

module.exports = Number;
const { DataTypes } = require('sequelize');
const sequelize = require('../Config/database');

const MeasureUnit = sequelize.define('measureUnit', {
  designation: {
    primaryKey: true,
    type: DataTypes.STRING,
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
  tableName: 'measureunit',
  freezeTableName: true
});

module.exports = MeasureUnit;
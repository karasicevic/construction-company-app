const { DataTypes } = require('sequelize');
const sequelize = require('../Config/database');

const Street = sequelize.define('street', {
    id:{
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
   name:{
    type: DataTypes.STRING,
    allowNull: false,
   }
},
{
  timestamps: false, 
  tableName: 'streets',
  freezeTableName: true
});

module.exports = Street;
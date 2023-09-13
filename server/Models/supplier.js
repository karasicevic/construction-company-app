
const { DataTypes } = require('sequelize');
const sequelize = require('../Config/database');

const Supplier = sequelize.define('supplier', {
  taxId: {
    primaryKey: true,
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  currentAccount: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cityId: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  streetId: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  number: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
},
{
  timestamps: false, 
  tableName: 'suppliers',
  freezeTableName: true
});

module.exports = Supplier;
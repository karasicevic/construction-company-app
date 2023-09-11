const { DataTypes } = require('sequelize');
const sequelize = require('../Config/database');

const Item = sequelize.define('item', {
    id: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    VATrate: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
    measureUnit: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
    {
        timestamps: false,
        tableName: 'items',
        freezeTableName: true
    });

module.exports = Item;
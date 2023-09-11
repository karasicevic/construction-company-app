const { DataTypes } = require('sequelize');
const sequelize = require('../Config/database');

const DispatchNote = sequelize.define('dispatchNote', {
    number:{
       primaryKey: true,
       type: DataTypes.INTEGER,
       allowNull: false,
    },
    supplierTaxId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
   shippingMethod:{
    type: DataTypes.STRING,
    allowNull: false,
   },
   date:{
    type: DataTypes.DATE,
    allowNull: false,
   },
   purchaseOrder:{
    type: DataTypes.INTEGER,
    allowNull: false,
   }
},
{
  timestamps: false, 
  tableName: 'dispatchnote',
  freezeTableName: true
});

module.exports = DispatchNote;
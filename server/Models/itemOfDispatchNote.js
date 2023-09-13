const { DataTypes } = require('sequelize');
const sequelize = require('../Config/database');

const ItemOfDispatchNote = sequelize.define('itemOfDispatchNote', {
    dispatchNote:{
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
     },
     number:{
       primaryKey: true,
       type: DataTypes.INTEGER,
       allowNull: false,
    },
    item: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
   note:{
    type: DataTypes.STRING,
    allowNull: false,
   },
   quantity:{
    type: DataTypes.INTEGER,
    allowNull: false,
   },
   purchaseOrder:{
    type: DataTypes.INTEGER,
    allowNull: false,
   },
   itemOfPurchaseOrder:{
    type: DataTypes.INTEGER,
    allowNull: false,
   }
},
{
  timestamps: false, 
  tableName: 'itemsofdispatchnote',
  freezeTableName: true
});


module.exports = ItemOfDispatchNote;

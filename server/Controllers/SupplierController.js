const { response } = require("express");
const Supplier = require("../Models/supplier");


exports.createSupplier = async(data) =>{
  try {
    console.log("controler: ", data);
    const newSupplier = await Supplier.create(data); 
    return newSupplier;
  } catch (error) {
    throw error;
  }
}

exports.findAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.findAll({
    });

    if (suppliers) {
      return suppliers; 
    } else {
      return { error: 'No suppliers found.' }; 
    }
  } catch (error) {
    console.error('Error retrieving suppliers:', error);
    throw error; 
  }
};
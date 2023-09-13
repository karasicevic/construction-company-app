const { response } = require("express");
const Supplier = require("../Models/supplier");


exports.createSupplier = async(data) =>{
  try {
    console.log("u controleru: ", data);
    const newSupplier = await Supplier.create(data); 
    console.log(newSupplier)
    return newSupplier;
  } catch (error) {
    console.log("greska pri samom ubacivanju u bazu")
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

exports.updateSupplier = async(supplierData)=> {
  try {
    console.log(supplierData)
    const supplier = await Supplier.findByPk(supplierData.taxId);

    if (!supplier) {
      throw new Error('Supplier not found'); 
    }

    supplier.set(supplierData);

  
    await supplier.save();

    return supplier; 
  } catch (error) {
    throw error; 
  }
};
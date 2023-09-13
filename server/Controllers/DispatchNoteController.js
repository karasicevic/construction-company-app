const DispatchNote = require("../Models/dispatchNote");
const ItemOfDispatchNote = require("../Models/itemOfDispatchNote");
const sequelize = require('../Config/database');

exports.createDispatchNoteWithItems = async (req) => {
  //napravi noteData i itemsData
  let itemsData = req.items
  let noteData = {
    number: req.number,
    shippingMethod: req.shippingMethod,
    date: req.date,
    supplierTaxId: req.supplierTaxId,
    purchaseOrder: req.purchaseOrder
  };

  const t = await sequelize.transaction();
  try {
    const note = await DispatchNote.create(noteData, { transaction: t });
console.log("********************11", noteData)

const items = await ItemOfDispatchNote.bulkCreate(itemsData, { transaction: t });
await t.commit();
console.log("********************22", noteData)

    console.log('Dispatch note and items created successfully.');
    return { note, items };
  } catch (error) {

    await t.rollback();
    console.error('Error creating dispatch note and items:', error);
    throw error;
  }

};

exports.updateDispatchNoteWithItems= async (note) => {
  console.log("usao u metodu kotrolera na serveru")
  let itemsData = note.items;
  let noteData = {
    number: note.number,
    shippingMethod: note.shippingMethod,
    date: note.date,
    supplierTaxId: note.supplierTaxId,
    purchaseOrder: note.purchaseOrder
  };

  const t = await sequelize.transaction();
  try {

    const [updatedNote] = await DispatchNote.update(noteData, {
      where: { number: note.number },
      returning: true, 
      transaction: t,
    });

    console.log(updatedNote)

    const deletedRowCount = await ItemOfDispatchNote.destroy({
      where: { dispatchNote: note.number },
      transaction: t,
    });

    const items = await ItemOfDispatchNote.bulkCreate(itemsData, { transaction: t });
    
    console.log("obrisane stavke: ", deletedRowCount)
    console.log("dodate stavke", items)

    await t.commit();

    console.log('Dispatch note and items  updated successfully.');

    return { note: noteData, items: itemsData };
  } catch (error) {
    await t.rollback();
    console.error('Error updating dispatch note and items:', error);
    throw error;
  }
};

exports.findAllDispatchNotes = async (req, res) => {
  try {
    const notes = await DispatchNote.findAll({
    });

    if (notes){
      return notes;
    } else {
      return {error: 'No dispatch notes found.'};
    }
  } catch (error) {
    console.error('Error retrieving dispatch notes:', error);
    return res.status(500).json({ error: 'Internal server error' }); 
  }
};
const express = require('express');
const router = express.Router();
const SupplierController = require('../Controllers/SupplierController');
const DispatchNoteController = require('../Controllers/DispatchNoteController');
const City = require("../Models/city");
const Street = require("../Models/street");
const Number = require("../Models/number");
const DispatchNote = require("../Models/dispatchNote");
const ItemOfDispatchNote = require('../Models/itemOfDispatchNote');
const Item = require('../Models/item');
const MeasureUnit = require('../Models/measureUnit');
const app = express();
app.use(express.json());


const port = 3000;

router.post('/suppliers', async (req, res) => {
  console.log("dosao do server")
  try {
    console.log("ovo je requestt:  ", req.body)
    const newSupplier = await SupplierController.createSupplier(req.body);
    res.status(201).json(newSupplier);
  } catch (error) {
    console.error('Error creating supplier:', error);
    res.status(500).json({ error: 'Unable to create supplier12s.' });
  }
});

router.get('/suppliers', async (req, res) => {
  try {
    const suppliers = await SupplierController.findAllSuppliers(req, res);
    res.json(suppliers);
  } catch (error) {
    console.error('Error retrieving suppliers:', error);
    res.status(500).json({ error: 'Unable to retrieve suppliers.' });
  }
});

router.put('/suppliers/:taxId', async (req, res) => {
  console.log("dosao do servera1")
  try {
    console.log("dosao do servera")
    const updatedSupplier = await SupplierController.updateSupplier(req.body);

    res.json(updatedSupplier);
  } catch (error) {
    console.error('Error updating supplier:', error);
    res.status(500).json({ error: 'Unable to update supplier.' });
  }
});

router.get('/cities', async (req, res) => {
  try {
    const cities = await City.findAll();
    res.json(cities);
  } catch (error) {
    console.error('Error fetching cities:', error);
    res.status(500).json({ error: 'An error occurred while fetching cities.' });
  }
});

router.get('/streets/:cityId', async (req, res) => {
  const cityId = req.params.cityId; // Use req.params.ptt to access the value
  try {
    const streets = await Street.findAll({ where: { cityId: cityId } });
    res.json(streets);
  } catch (error) {
    console.error('Error fetching streets:', error);
    res.status(500).json({ error: 'An error occurred while fetching streets.' });
  }
});

router.get('/numbers/:cityId/:streetId', async (req, res) => {
  const { cityId, streetId } = req.params;

  try {
    const numbers = await Number.findAll({ where: { cityId: cityId, streetId: streetId } });

    if (numbers) {
      res.json(numbers);
    } else {
      res.status(404).json({ error: 'No number found for the provided zip code and ID.' });
    }
  } catch (error) {
    console.error('Error retrieving nuumbers:', error);
    res.status(500).json({ error: 'Unable to retrieve numbers.' });
  }
});

router.get('/dispatch-notes', async (req, res) => {
  try {
    const notes = await DispatchNoteController.findAllDispatchNotes();
    res.json(notes);
  } catch (error) {
    console.error('Error fetching accountings:', error);
    res.status(500).json({ error: 'An error occurred while fetching accountings.' });
  }
});

router.post('/dispatch-notes', async (req, res) => {
  try {
    const newDispatchNote = await DispatchNoteController.createDispatchNoteWithItems(req.body);
    res.status(201).json(newDispatchNote);
  } catch (error) {
    console.error('Error creating dispatch note:', error);
    res.status(500).json({ error: 'Unable to create dispatch note.' });
  }
});

router.put('/dispatch-notes/:number', async (req, res) => {
  try {
    const updatedDispatchNote = await DispatchNoteController.updateDispatchNoteWithItems(req.body);
    res.status(201).json(updatedDispatchNote);
  } catch (error) {
    console.error('Error updating dispatch note:', error);
    res.status(500).json({ error: 'Unable to update dispatch note.' });
  }
});

router.get('/items', async (req, res) => {
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (error) {
    console.error('Error fetching types:', error);
    res.status(500).json({ error: 'An error occurred while fetching types.' });
  }
});

router.get('/dispatch-notes/:number', async (req, res) => {
  try {
    const noteNumber = req.params.number;
    const itemsOfNote = await ItemOfDispatchNote.findAll({ where: { dispatchNote: noteNumber } });
    res.json(itemsOfNote);
  } catch (error) {
    console.error('Error fetching types:', error);
    res.status(500).json({ error: 'An error occurred while fetching types.' });
  }
});

router.get('/measure-units/:designation', async (req, res) => {
  try {
    const designation = req.params.designation
    const units = await MeasureUnit.findAll({ where: { designation: designation } });
    res.json(mere);
  } catch (error) {
    console.error('Error fetching types:', error);
    res.status(500).json({ error: 'An error occurred while fetching types.' });
  }
});


module.exports = router;
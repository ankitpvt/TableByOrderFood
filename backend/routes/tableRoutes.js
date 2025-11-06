const express = require('express');
const Table = require('../model/table')

const router = express.Router();

// ✅ Get all tables
router.get('/', async (req, res) => {
  const tables = await Table.find();
  res.json(tables);
});

// ✅ Add a new table
router.post('/', async (req, res) => {
  try {
    const { tableNumber, capacity } = req.body;
    const table = new Table({ tableNumber, capacity });
    await table.save();
    res.json(table);
  } catch (error) {
    res.status(500).json({ message: 'Error adding table', error });
  }
});

// ✅ Delete a table
router.delete('/:id', async (req, res) => {
  try {
    await Table.findByIdAndDelete(req.params.id);
    res.json({ message: 'Table deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting table', error });
  }
});

module.exports = router;

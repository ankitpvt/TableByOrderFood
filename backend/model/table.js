const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  tableNumber: { type: Number, required: true, unique: true },
  capacity: { type: Number, default: 4 },
  status: { type: String, default: 'Available' }, // Available | Occupied
});

module.exports = mongoose.model('Table', tableSchema);

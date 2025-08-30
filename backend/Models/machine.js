const mongoose = require('mongoose');

const machineSchema = new mongoose.Schema({
  name: { type: String, required: true },
   acquisitionDate: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Machine', machineSchema);

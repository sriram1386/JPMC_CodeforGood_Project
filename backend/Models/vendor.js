const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  name: String,
  contact: String,
  address: String,
  machinesSupplied: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Machine' }]
});

module.exports = mongoose.model('Vendor', vendorSchema);

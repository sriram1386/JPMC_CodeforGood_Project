const mongoose = require('mongoose');

const villageSchema = new mongoose.Schema({
  village: { type: String, required: true },     // Name of the village
  district: { type: String, required: true },    // District name
  subdistrict: { type: String },                 // Sub-district or taluka
  population: { type: Number },                  // Total population
  farmers: { type: Number },                     // Number of main cultivators
});

module.exports = mongoose.model('Village', villageSchema);

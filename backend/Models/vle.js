const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    unique: true,
  },
  phone: { type: String },
  password: { type: String }, // required for login-based roles

  // VLE-Specific Fields
  village: { type: mongoose.Schema.Types.ObjectId, ref: 'Village' },
  totalAcres: { type: Number },
  totalIncome: { type: Number },
  assignedMachines: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Machine' }],
  onboardingDate: { type: Date },

  // New fields
  fromDate: { type: Date },
  toDate: { type: Date },
  incomeBetween: { type: Number }, // income in the range between fromDate and toDate

}, { timestamps: true });

module.exports = mongoose.model('Vle', userSchema);

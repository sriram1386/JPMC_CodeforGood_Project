const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    unique: true,
  },
  phone: { type: String },
  password: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');

const problemReportSchema = new mongoose.Schema({
  village: { type: mongoose.Schema.Types.ObjectId, ref: 'Village' },
  farmerName: String,
  farmerContact: String,
  problemType: { type: String, enum: ['operational','environmental','labour','harvest'] },
  cropType: { type: String, enum: ['maize','paddy','wheat','other'] },
  createdAt: { type: Date, default: Date.now },
  WillingToBeVle:{type:String,enum:["Yes","No"]},
});

module.exports = mongoose.model('ProblemReport', problemReportSchema);

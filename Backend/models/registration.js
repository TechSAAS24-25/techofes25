const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  registrationID:{
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  T_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  eventID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

registrationSchema.index({ T_ID: 1, eventID: 1 }, { unique: true });
module.exports = mongoose.model('Registration', registrationSchema);

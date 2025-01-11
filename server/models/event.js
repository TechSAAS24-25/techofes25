const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventID:{
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  eventName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['General', 'Carnival', 'Signature', 'Pro-shows'],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  seats: {
    type: Number,
    required: true
  },
  regFees: {
    type: Number,
  }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);

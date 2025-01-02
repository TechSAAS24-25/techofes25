const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
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
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);

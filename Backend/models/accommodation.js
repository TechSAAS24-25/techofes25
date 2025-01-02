const mongoose = require('mongoose');

const accommodationSchema = new mongoose.Schema({
  hostelName: {
    type: String,
    required: true,
  },
  pricePerNight: {
    type: Number,
    required: true,
    min: [0, 'Price per night must be positive'],
  },
}, { timestamps: true });

module.exports = mongoose.model('Accommodation', accommodationSchema);

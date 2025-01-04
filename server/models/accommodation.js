const mongoose = require('mongoose');

const accommodationSchema = new mongoose.Schema({
  accommodationID:{
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  hostelName: {
    type: String,
    required: true,
  },
  pricePerNight: {
    type: Number,
    required: true,
    min: [0, 'Price per night must be positive'],
  },
  availableBeds: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Accommodation', accommodationSchema);

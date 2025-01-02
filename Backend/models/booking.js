const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  T_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  accommodationID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Accommodation',
    required: true,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  duration: {
    type: Number,
    required: true,
    min: [1, 'Duration must be at least 1 night'],
  },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);

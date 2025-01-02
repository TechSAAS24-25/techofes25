const mongoose = require('mongoose');

const merchandiseSchema = new mongoose.Schema({
  merchandiseID:{
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  merchandiseName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price must be positive'],
  },
}, { timestamps: true });

module.exports = mongoose.model('Merchandise', merchandiseSchema);

const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  purchaseID:{
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  T_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  merchandiseID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Merchandise',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1'],
  },
}, { timestamps: true });

module.exports = mongoose.model('Purchase', purchaseSchema);

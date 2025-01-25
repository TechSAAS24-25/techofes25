const mongoose = require('mongoose');
const idTrackerSchema = new mongoose.Schema({
    insiderId: {
      type: Number,
      required: true,
      default: 2025000001,
    },
    outsiderId: {
      type: Number,
      required: true,
      default: 2025100001,
    },
  });

  // Middleware to ensure the IdTracker document exists and create it if not
idTrackerSchema.statics.ensureIdTrackerExists = async function () {
  let idTracker = await this.findOne();

  // If no IdTracker document exists, create a new one with default values
  if (!idTracker) {
    idTracker = new this({
      insiderId: 2025000001, // Starting value for Insider IDs
      outsiderId: 2025100001, // Starting value for Outsider IDs
    });
    await idTracker.save(); // Save the new document to the database
  }

  return idTracker;
};
  
  module.exports = mongoose.model('IdTracker', idTrackerSchema);
  
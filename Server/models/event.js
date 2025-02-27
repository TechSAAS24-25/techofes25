const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    eventID: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    eventName: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["General Events", "Carnivals", "Signature Events", "Pro-shows", "Sports"],
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: true,
    },
    seats: {
      type: Number,
      required: true,
    },
    regFees: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);

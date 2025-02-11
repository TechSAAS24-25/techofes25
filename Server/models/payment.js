const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    transactionID: {
      type: String,
      auto: true,
    },
    T_ID: {
      type: String,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["Event", "Merchandise", "Accommodation"],
      required: true,
    },
    itemID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "type",
    },
    dateTime: {
      type: Date,
      default: Date.now,
      required: true,
    },
    screenshotPath: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);

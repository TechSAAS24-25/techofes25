const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    transactionID: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    T_ID: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);

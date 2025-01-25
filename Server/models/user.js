const mongoose = require("mongoose");
const IdTracker = require("./idTracker");

const userSchema = new mongoose.Schema(
  {
    T_ID: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
      type: String,
      unique: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    emailID: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      enum: ["Insider", "Outsider"],
      required: true,
    },
    rollNo: {
      type: String,
      required: function () {
        return this.userType === "Insider";
      },
    },
  },
  { timestamps: true }
);

// Middleware to ensure the T_ID is generated before saving the document
userSchema.pre("save", async function (next) {
  if (!this.T_ID) {
    const idTracker = await IdTracker.ensureIdTrackerExists();
    if (this.userType === "Insider") {
      this.T_ID = `CEG${idTracker.insiderId}`;
      idTracker.insiderId++; // Increment for the next Insider
    } else if (this.userType === "Outsider") {
      this.T_ID = `EXT${idTracker.outsiderId}`;
      idTracker.outsiderId++; // Increment for the next Outsider
    }
    await idTracker.save(); // Save the updated ID tracker after incrementing
  }
  next();
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  },
});

module.exports = mongoose.model("User", userSchema);

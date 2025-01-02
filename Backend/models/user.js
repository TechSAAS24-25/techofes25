const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  T_ID:{
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
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
    required: true
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
    enum: ['Insider', 'Outsider'],
    required: true,
  },
  rollNo: {
    type: String,
    required: function () {
      return this.userType === 'Insider';
    },
  },
}, { timestamps: true });

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema);

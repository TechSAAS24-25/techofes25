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
  emailID: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/,
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

module.exports = mongoose.model('User', userSchema);

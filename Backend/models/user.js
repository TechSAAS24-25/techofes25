const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  }, 
  firstName: String,
  lastName: String,
  passwordHash: String,
  generalEvents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event'
    }
  ],
  workshops: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Workshop'
    }
  ],
  techEvents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TechEvent'
    }
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})


module.exports = mongoose.model('User', userSchema)

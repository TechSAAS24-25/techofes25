const mongoose = require('mongoose')

const TechEventSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  }, 
  description: String,
  prerequisites: String,
  date: Date,
  time: String,
  location: String,
  maxparticipants: Number,
  sponsers: String,
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
})

TechEventSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('TechEvent', TechEventSchema)

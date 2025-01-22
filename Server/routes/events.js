const jwt = require('jsonwebtoken')
const eventsRouter = require('express').Router()
const eventDetailsRouter = require('express').Router()
const eventRegistrationRouter = require('express').Router()
require('express-async-errors')
const Event = require('../models/event')
const Registration = require('../models/registration')
const userExtractor = require('../utils/middleware').userExtractor

//to get all events
eventsRouter.get('/', async (request, response) => {
    const events = await Event.find({})
    response.json(events)
    }
)

//to get a particular event
eventDetailsRouter.get('/:eventId', async(request, response) => {
    const eventID = request.params.eventId
    const event = await Event.findOne({eventID})
    response.status(200).json(event)
})

//to register for an event
//need the jwt token in the headers (from the frontend)
eventRegistrationRouter.post('/:eventId/register',userExtractor, async(request,response) =>
{
    const eventID = request.params.eventId
    const id = request.T_ID

    const event = await Event.findOne({eventID});
    if (!event) {
        return res.status(404).json({ error: 'Event not found' });
    }

    if(event.seats < 1) {
       return res.status(404).json({error: 'Seats not available'})
    }
    const reg = new Registration ({
        T_ID : id,
        eventID,
    })
    
    //payment logic
    //total price calculation
    //payment gateway
    //if payment success following code executed
    
    const savedReg = await reg.save();
    event.seats -= 1
    await event.save()
    response.status(201).json({message:"successfully registered for the event", reg:savedReg})
})

module.exports = {
    eventsRouter,
    eventDetailsRouter,
    eventRegistrationRouter
}
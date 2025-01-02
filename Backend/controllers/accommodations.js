const jwt = require('jsonwebtoken');
require('express-async-errors');
const Accommodation = require('../models/accommodation'); 
const Booking = require('../models/booking');
const userExtractor = require('../utils/middleware').userExtractor;
const express = require('express');
const accommodationsRouter = express.Router();
const bookAccommodationRouter = express.Router();

accommodationsRouter.get('/', async (req, res) => {
    const accommodations = await Accommodation.find({});
    res.status(200).json(accommodations);
});

// Route to book an accommodation
bookAccommodationRouter.post('/:accommodationId/book', userExtractor, async (req, res) => {
    const accommodationID = req.params.accommodationId; // Extract accommodationId from URL
    const { duration } = req.body; // Duration from request body
    const T_ID = req.T_ID; // Extracted from userExtractor middleware

    // Check if the accommodation exists
    const accommodation = await Accommodation.findOne({accommodationID});
    if (!accommodation) {
        return res.status(404).json({ error: 'Accommodation not found' });
    }

    if(accommodation.availableBeds < 1) {
       return res.status(404).json({error: 'Accommodation not available'})
    }
    // Create a new booking
    const booking = new Booking({
        T_ID,
        accommodationID,
        duration,
    });
    
    //payment logic
    //total price calculation
    //payment gateway
    //if payment success following code executed

    // Save the booking
    const savedBooking = await booking.save();
    accommodation.availableBeds -= 1
    await accommodation.save()

    res.status(201).json({
        message: 'Accommodation booked successfully',
        booking: savedBooking,
    });
});

module.exports = {
    accommodationsRouter,
    bookAccommodationRouter,
};

const express = require('express');
require('express-async-errors');
const User = require('../models/user');
const Registration = require('../models/registration');
const userDetailsRouter = express.Router();
const totalRegistrationsRouter = express.Router();
const eventRegistrationsRouter = express.Router();
const totalEventRegistrationsRouter = express.Router();

//need to add authentication userExtractor middleware
//for that username admin has to be generated in the database
//example code:
// userDetailRouter.get('/users', userExtractor, async (req, res) => {
//     const user = req.user;
//     if(user.username !== 'admin') {
//         return res.status(401).json({ error: 'Unauthorized access' });
//     }

// Route to get all user details
userDetailsRouter.get('/users', async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
});

// Route to get total number of users registered
totalRegistrationsRouter.get('/totalusers', async (req, res) => {
    const registrations = await User.find({});
    res.status(200).json({ totalUserRegistrations: registrations.length });
});

// Route to get total number of registrations for a specific event
eventRegistrationsRouter.get('/registrations/:eventId', async (req, res) => {
    const eventId = req.params.eventId;
    const registrations = await Registration
        .find({ eventId: eventId });
    res.status(200).json({ totalRegistrations: registrations.length });
});

// Route to get total number of registrations for all events
totalEventRegistrationsRouter.get('/totalregistrations', async (req, res) => {
    const registrations = await Registration.find({});
    res.status(200).json({ totalRegistrations: registrations.length });
});


module.exports = { 
    userDetailsRouter, 
    totalRegistrationsRouter, 
    eventRegistrationsRouter,
    totalEventRegistrationsRouter,
};

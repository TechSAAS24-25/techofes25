const jwt = require("jsonwebtoken");
const eventsRouter = require("express").Router();
const eventDetailsRouter = require("express").Router();
const eventRegistrationRouter = require("express").Router();
require("express-async-errors");
const Event = require("../models/event");
const Registration = require("../models/registration");
const userExtractor = require("../utils/middleware").userExtractor;
const mongoose = require("mongoose");

//to get all events
eventsRouter.get("/", async (request, response) => {
  const events = await Event.find({});
  response.json(events);
});

//to get a particular event
eventDetailsRouter.get("/:eventId", async (request, response) => {
  const eventID = request.params.eventId;
  const event = await Event.findOne({
    _id: new mongoose.Types.ObjectId(eventID),
  });
  response.status(200).json(event);
});

//to register for an event
//need the jwt token in the headers (from the frontend)
eventRegistrationRouter.post(
  "/:eventId/register",
  userExtractor,
  async (request, response) => {
    const eventID = request.params.eventId;
    const id = request.T_ID;
    console.log(eventID, "+++");

    const event = await Event.findOne({
      _id: new mongoose.Types.ObjectId(eventID),
    });

    if (!event) {
      return response.status(404).json({ error: "Event not found" });
    }

    if (event.seats < 1) {
      return response.status(404).json({ error: "Seats not available" });
    }
    const reg = new Registration({
      T_ID: id,
      eventID,
    });

    //payment logic
    //total price calculation
    //payment gateway
    //if payment success following code executed

    const savedReg = await reg.save();
    console.log(savedReg);
    event.seats -= 1;
    await event.save();

    response.status(201).json({
      message: "successfully registered for the event",
      reg: savedReg,
    });
  }
);

// To check if the user is registered for an event
eventRegistrationRouter.get(
  "/:eventId/status",
  userExtractor,
  async (request, response) => {
    const eventID = request.params.eventId;
    const userID = request.T_ID; // Extracted from userExtractor middleware

    try {
      // Check if the user is registered for the event
      const isRegistered = await Registration.exists({ T_ID: userID, eventID });

      if (!isRegistered) {
        return response.status(200).json({
          message: "User is not registered for this event",
          isRegistered: false,
        });
      }

      // If registered, return the registration details
      const registration = await Registration.findOne({
        T_ID: userID,
        eventID,
      });

      response.status(200).json({
        message: "User is registered for this event",
        isRegistered: true,
        registration,
      });
    } catch (error) {
      console.error("Error checking registration status:", error);
      response.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = {
  eventsRouter,
  eventDetailsRouter,
  eventRegistrationRouter,
  eventRegistrationRouter,
};

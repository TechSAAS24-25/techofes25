const jwt = require("jsonwebtoken");
const eventsRouter = require("express").Router();
const eventDetailsRouter = require("express").Router();
const eventRegistrationRouter = require("express").Router();
const eventPaymentRouter = require("express").Router();
const eventGeneralRegistrationRouter = require("express").Router();
require("express-async-errors");
const Event = require("../models/event");
const Registration = require("../models/registration");
const Payment = require("../models/payment");
const userExtractor = require("../utils/middleware").userExtractor;
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = require("../utils/config");

// Cloudinary Configuration
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

// Multer Setup for Handling File Uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Get all events
eventsRouter.get("/", async (request, response) => {
  const events = await Event.find({});
  response.json(events);
});

// Get a particular event
eventDetailsRouter.get("/:eventId", async (request, response) => {
  const eventID = request.params.eventId;
  const event = await Event.findById(eventID);
  response.status(200).json(event);
});
// Register for an Event (with Payment Screenshot)
eventPaymentRouter.post(
  "/:eventId/pay",
  userExtractor,
  upload.single("screenshot"),
  async (request, response) => {
    try {
      const eventID = request.params.eventId;
      const { transactionId, screenshot } = request.body;
      const T_ID = request.T_ID;

      // Check if event exists
      const event = await Event.findById(eventID);
      if (!event) {
        return response.status(404).json({ error: "Event not found" });
      }

      // Check if payment with the same T_ID and eventID already exists
      const existingPayment = await Payment.findOne({ T_ID, itemID: eventID });
      // console.log(existingPayment, T_ID, eventID);
      if (existingPayment) {
        return response
          .status(400)
          .json({ error: "Cannot make duplicate payments!" });
      }

      // Check if the transactionId has already been submitted
      const existingTransaction = await Payment.findOne({
        transactionID: transactionId,
      });
      if (existingTransaction) {
        return response
          .status(400)
          .json({ error: "This transaction ID has already been used!" });
      }

      if (!screenshot) {
        return response.status(400).json({ error: "Screenshot is required" });
      }

      const buffer = Buffer.from(screenshot, "base64");

      // Upload Screenshot to Cloudinary
      cloudinary.uploader
        .upload_stream(
          {
            folder: `events/${eventID}`,
            public_id: T_ID,
            format: "png",
          },
          async (error, result) => {
            if (error) {
              console.error("Cloudinary Upload Error:", error);
              return response
                .status(500)
                .json({ error: "Image upload failed" });
            }

            // Save Payment Info in Database
            const payment = new Payment({
              T_ID,
              transactionID: transactionId,
              type: "Event",
              itemID: eventID,
              screenshotPath: result.secure_url,
              status: "pending", // Initial status set to 'pending'
            });

            const savedPayment = await payment.save();

            response.status(201).json({
              message:
                "Successfully registered for the event, waiting for admin approval...",
              payment: savedPayment,
            });
          }
        )
        .end(buffer);
    } catch (error) {
      console.error("Registration Error:", error);
      response.status(500).json({ error: "Internal server error" });
    }
  }
);

// Register for an Event
eventRegistrationRouter.post(
  "/:eventId/register",
  userExtractor,
  async (request, response) => {
    try {
      const user = request.T_ID;
      if (user !== "001") {
        return response.status(403).json({ error: "Unauthorized" });
      }
      const eventID = request.params.eventId;
      const { T_ID, answer } = request.body;

      const event = await Event.findById(eventID);
      if (!event) {
        return response.status(404).json({ error: "Event not found" });
      }

      if (answer === "Yes") {
        if (event.seats < 1) {
          return response.status(200).json({
            message: "Registration denied due to no available seats",
            status: "rejected",
          });
        }

        let eventsToRegister = [event];

        // Check if the event is a general event
        if (event.category === "General Events") {
          eventsToRegister = await Event.find({ category: "General Events" });
        }

        const registrations = [];

        for (const ev of eventsToRegister) {
          if (ev.seats < 1) continue; // Skip events with no available seats

          // Check if the user is already registered for this event
          const existingRegistration = await Registration.findOne({
            T_ID,
            eventID: ev._id,
          });
          if (existingRegistration) continue;

          // Register the user for each general event
          const registration = new Registration({
            T_ID: T_ID,
            eventID: ev._id,
          });
          const savedReg = await registration.save();
          registrations.push(savedReg);

          ev.seats -= 1;
          await ev.save();

          // Update payment status
          const existingPayment = await Payment.findOne({
            T_ID,
            itemID: ev._id,
          });
          if (existingPayment) {
            existingPayment.status = "approved";
            await existingPayment.save();
          }
        }

        response.status(201).json({
          message: "Successfully registered for event(s)",
          registrations,
        });
      } else {
        const payment = await Payment.findOne({ T_ID: T_ID, itemID: eventID });

        payment.status = "rejected";
        await payment.save();

        response.status(200).json({
          message: "Registration denied by admin",
          status: "rejected",
        });
      }
    } catch (error) {
      console.error("Registration Error:", error);
      response.status(500).json({ error: "Internal server error" });
    }
  }
);

// Register CEG Users for General Events

eventGeneralRegistrationRouter.post(
  "/register/general",
  userExtractor,
  async (request, response) => {
    try {
      const { T_ID } = request.body;

      // Check if the user's T_ID ends with "CEG"
      if (!T_ID.endsWith("CEG")) {
        return response
          .status(403)
          .json({ error: "Unauthorized - Not a CEG user" });
      }

      // Fetch all general events
      const generalEvents = await Event.find({ category: "General Events" });
      if (generalEvents.length === 0) {
        return response
          .status(404)
          .json({ error: "No general events available" });
      }

      const registrations = [];

      for (const event of generalEvents) {
        if (event.seats < 1) continue; // Skip if no available seats

        // Check if the user is already registered for this event
        const existingRegistration = await Registration.findOne({
          T_ID,
          eventID: event._id,
        });
        if (existingRegistration) continue;

        // Register the user
        const registration = new Registration({ T_ID, eventID: event._id });
        const savedReg = await registration.save();
        registrations.push(savedReg);

        // Decrease the available seats
        event.seats -= 1;
        await event.save();

        // Update payment status if applicable
        const existingPayment = await Payment.findOne({
          T_ID,
          itemID: event._id,
        });

        if (existingPayment) {
          existingPayment.status = "approved";
          await existingPayment.save();
        }
      }

      response.status(201).json({
        message: "Successfully registered for general events",
        registrations,
      });
    } catch (error) {
      console.error("General Event Registration Error:", error);
      response.status(500).json({ error: "Internal server error" });
    }
  }
);

// Check Payment Status (Pending, Completed, or Rejected)
eventRegistrationRouter.get(
  "/:eventId/status",
  userExtractor,
  async (request, response) => {
    try {
      const eventID = request.params.eventId;
      const userID = request.T_ID;
      const payment = await Payment.findOne({ T_ID: userID, itemID: eventID });
      const registration = await Registration.findOne({
        T_ID: userID,
        eventID: eventID,
      });

      if (!registration && payment) {
        return response.status(200).json({
          message: `Payment status: ${payment.status}`,
          isRegistered: false,
          status: payment.status,
        });
      } else if (!registration && !payment) {
        return response.status(200).json({
          message: "User not registered for the event",
          isRegistered: false,
          status: "not registered",
        });
      } else if (registration) {
        return response.status(200).json({
          message: "User is registered for the event",
          isRegistered: true,
          status: "registered",
        });
      }
    } catch (error) {
      console.error("Error checking payment status:", error);
      response.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = {
  eventsRouter,
  eventDetailsRouter,
  eventRegistrationRouter,
  eventPaymentRouter,
  eventGeneralRegistrationRouter,
};

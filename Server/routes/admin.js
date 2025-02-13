const express = require("express");
require("express-async-errors");
const User = require("../models/user");
const Registration = require("../models/registration");
const Payment = require("../models/payment");
const Event = require("../models/event");
const userDetailsRouter = express.Router();
const totalRegistrationsRouter = express.Router();
const eventRegistrationsRouter = express.Router();
const totalEventRegistrationsRouter = express.Router();
const getPendingPaymentRouter = express.Router();
const getApprovedPaymentRouter = express.Router();

//need to add authentication userExtractor middleware
//for that username admin has to be generated in the database
//example code:
// userDetailRouter.get('/users', userExtractor, async (req, res) => {
//     const user = req.user;
//     if(user.username !== 'admin') {
//         return res.status(401).json({ error: 'Unauthorized access' });
//     }

// Route to get all user details
userDetailsRouter.get("/users", async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

// Route to get total number of users registered
totalRegistrationsRouter.get("/totalusers", async (req, res) => {
  const registrations = await User.find({});
  res.status(200).json({ totalUserRegistrations: registrations.length });
});

// Route to get total number of registrations for a specific event
eventRegistrationsRouter.get("/registrations/:eventId", async (req, res) => {
  const eventId = req.params.eventId;
  const registrations = await Registration.find({ eventId: eventId });
  res.status(200).json({ totalRegistrations: registrations.length });
});

// Route to get total number of registrations for all events
totalEventRegistrationsRouter.get("/totalregistrations", async (req, res) => {
  const registrations = await Registration.find({});
  res.status(200).json({ totalRegistrations: registrations.length });
});

// Route to get all pending payments with User and Event details
getPendingPaymentRouter.get("/payments/pending", async (req, res) => {
  try {
    const payments = await Payment.find({ status: "pending" });

    if (!payments.length) {
      return res.status(200).json({ message: "No pending payments found" });
    }

    // console.log(payments);

    const paymentDetails = await Promise.all(
      payments.map(async (payment) => {
        const user = await User.findOne({ T_ID: payment.T_ID });
        const event =
          payment.type === "Event"
            ? await Event.findById(payment.itemID)
            : null;

        // console.log(event, user);

        return {
          _id: payment._id,
          transactionID: payment.transactionID,
          T_ID: payment.T_ID,
          amount: event.regFees,
          screenshotPath: payment.screenshotPath,
          status: payment.status,
          transactionDate: payment.transactionDate,
          userName: user.firstName + " " + user.lastName,
          userEmail: user.emailID,
          userType: user.userType,
          phone: user.phoneNumber,
          ...(event && {
            eventId: event._id,
            eventName: event.eventName,
            category: event.category,
            date: event.date,
            location: event.location,
          }),
        };
      })
    );

    res.status(200).json(paymentDetails);
  } catch (error) {
    console.error("Error fetching pending payments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to get all approved payments
getApprovedPaymentRouter.get("/payments/approved", async (req, res) => {
  try {
    const payments = await Payment.find({
      status: { $in: ["approved", "rejected"] },
    });

    if (!payments.length) {
      return res
        .status(200)
        .json({ message: "No approved or rejected payments found" });
    }

    // console.log(payments);

    const paymentDetails = await Promise.all(
      payments.map(async (payment) => {
        const user = await User.findOne({ T_ID: payment.T_ID });
        const event =
          payment.type === "Event"
            ? await Event.findById(payment.itemID)
            : null;

        // console.log(event, user);

        return {
          _id: payment._id,
          transactionID: payment.transactionID,
          T_ID: payment.T_ID,
          amount: event.regFees,
          screenshotPath: payment.screenshotPath,
          status: payment.status,
          transactionDate: payment.transactionDate,
          userName: user.firstName + " " + user.lastName,
          userEmail: user.emailID,
          userType: user.userType,
          phone: user.phoneNumber,
          ...(event && {
            eventId: event.eventID,
            eventName: event.eventName,
            category: event.category,
            date: event.date,
            location: event.location,
          }),
        };
      })
    );

    res.status(200).json(paymentDetails);
  } catch (error) {
    console.error("Error fetching pending payments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = {
  userDetailsRouter,
  totalRegistrationsRouter,
  eventRegistrationsRouter,
  totalEventRegistrationsRouter,
  getPendingPaymentRouter,
  getApprovedPaymentRouter,
};

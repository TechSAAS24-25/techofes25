const User = require("../models/user");
const Registration = require("../models/registration");
const Purchase = require("../models/purchase");
const Booking = require("../models/booking");
const Event = require("../models/event");
const Merchandise = require("../models/merchandise");
const Accommodation = require("../models/accommodation");
const userExtractor = require("../utils/middleware").userExtractor;
const userDetailsRouter = require("express").Router();
const userRegistrationsRouter = require("express").Router();
const userPurchasesRouter = require("express").Router();
const userAccommodationsRouter = require("express").Router();
require("express-async-errors");

// Get user details
userDetailsRouter.get("/", userExtractor, async (request, response) => {
  const T_ID = request.T_ID;

  const user = await User.findOne({ T_ID }).select("-passwordHash");
  if (!user) {
    return response.status(404).json({ error: "User not found" });
  }
  response.status(200).json(user);
});

// Get all events registered by the user, including event details
userRegistrationsRouter.get(
  "/registrations",
  userExtractor,
  async (request, response) => {
    const T_ID = request.T_ID;

    const registrations = await Registration.find({ T_ID });
    const eventDetails = await Promise.all(
      registrations.map(async (registration) => {
        const eventID = registration.eventID;
        const event = await Event.findOne({ eventID });
        return {
          registrationID: registration.registrationID,
          eventName: event.eventName,
          category: event.category,
          date: event.date,
          location: event.location,
        };
      })
    );
    response.status(200).json(eventDetails);
  }
);

// Get all merchandise purchases by the user, including merchandise details
userPurchasesRouter.get(
  "/purchases",
  userExtractor,
  async (request, response) => {
    const T_ID = request.T_ID;

    const purchases = await Purchase.find({ T_ID });
    const purchaseDetails = await Promise.all(
      purchases.map(async (purchase) => {
        const merchandiseID = purchase.merchandiseID;
        const merchant = await Merchandise.findOne({ merchandiseID });
        return {
          purchaseID: purchase.purchaseID,
          merchandiseName: merchant.merchandiseName,
          price: merchant.price,
          quantity: purchase.quantity,
        };
      })
    );
    response.status(200).json(purchaseDetails);
  }
);

// Get all accommodations booked by the user, including accommodation details
userAccommodationsRouter.get(
  "/accommodations",
  userExtractor,
  async (request, response) => {
    const T_ID = request.T_ID;

    const Bookings = await Booking.find({ T_ID });
    const accommodations = await Promise.all(
      Bookings.map(async (booking) => {
        const accommodationID = booking.accommodationID;
        const accommodation = await Accommodation.findOne({ accommodationID });
        return {
          hostelName: accommodation.hostelName,
          accommodationID: accommodation.accommodationID,
          duration: booking.duration,
        };
      })
    );
    response.status(200).json(accommodations);
  }
);

module.exports = {
  userDetailsRouter,
  userRegistrationsRouter,
  userPurchasesRouter,
  userAccommodationsRouter,
};

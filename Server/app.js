const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const eventsRouter = require("./routes/events");
const authRouter = require("./routes/auth");
const merchandiseRouter = require("./routes/merchandise");
const accommodationsRouter = require("./routes/accommodations");
const adminRouter = require("./routes/admin");
const usersRouter = require("./routes/users");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
require("express-async-errors");

mongoose.set("strictQuery", false);

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());

app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);

// Auth Routes
app.use("/api/auth/register", authRouter.registerRouter);
app.use("/api/auth/login", authRouter.loginRouter);
app.use("/api/auth/logout", authRouter.logoutRouter);

// User Routes
app.use("/api/profile", usersRouter.userDetailsRouter);
app.use("/api/profile", usersRouter.userRegistrationsRouter);
app.use("/api/profile", usersRouter.userPurchasesRouter);
app.use("/api/profile", usersRouter.userPaymentsRouter);
app.use("/api/profile", usersRouter.userAccommodationsRouter);

// Event Routes
app.use("/api/events", eventsRouter.eventsRouter);
app.use("/api/events", eventsRouter.eventDetailsRouter);
app.use("/api/events", eventsRouter.eventRegistrationRouter);
app.use("/api/events", eventsRouter.eventPaymentRouter);

// Merchandise Routes
app.use("/api/merchandise", merchandiseRouter.merchandiseRouter);
app.use("/api/merchandise", merchandiseRouter.purchaseMerchRouter);

// Accommodation Routes
app.use("/api/accommodations", accommodationsRouter.accommodationsRouter);
app.use("/api/accommodations", accommodationsRouter.bookAccommodationRouter);

// Admin Routes
app.use("/api/admin", adminRouter.userDetailsRouter);
app.use("/api/admin", adminRouter.totalRegistrationsRouter);
app.use("/api/admin", adminRouter.totalEventRegistrationsRouter);
app.use("/api/admin", adminRouter.eventRegistrationsRouter);
app.use("/api/admin", adminRouter.getPendingPaymentRouter);
app.use("/api/admin", adminRouter.getApprovedPaymentRouter);

app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

module.exports = app;

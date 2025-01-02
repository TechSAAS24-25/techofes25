const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const eventsRouter = require('./controllers/events')
const authRouter = require('./controllers/auth')
const merchandiseRouter = require('./controllers/merchandise')
const accommodationsRouter = require('./controllers/accommodations')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
require('express-async-errors')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())

app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

// Auth Routes
app.use('/api/auth/register', authRouter.registerRouter);
app.use('/api/auth/login', authRouter.loginRouter);
app.use('/api/auth/logout', authRouter.logoutRouter);
// // User Routes
// app.use('/api/users/:userId', usersRouter.userDetailsRouter);
// app.use('/api/users/:userId/registrations', usersRouter.userRegistrationsRouter);
// app.use('/api/users/:userId/purchases', usersRouter.userPurchasesRouter);
// app.use('/api/users/:userId/accommodations', usersRouter.userAccommodationsRouter);
// // Event Routes
// app.use('/api/events', eventsRouter.eventsRouter);
// app.use('/api/events/:eventId', eventsRouter.eventDetailsRouter);
// app.use('/api/events/:eventId/register', eventsRouter.eventRegistrationRouter);
// // Merchandise Routes
// app.use('/api/merchandise', merchandiseRouter.merchandiseRouter);
// app.use('/api/merchandise/:merchandiseId/purchase', merchandiseRouter.purchaseMerchRouter);
// // Accommodation Routes
// app.use('/api/accommodations', accommodationsRouter.accommodationsRouter);
// app.use('/api/accommodations/:accommodationId/book', accommodationsRouter.bookAccommodationRouter);
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
module.exports = app
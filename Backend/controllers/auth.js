const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const logoutRouter = require('express').Router()
const registerRouter = require('express').Router()
const User = require('../models/user')

// Register Route
registerRouter.get('/', (request, response) => {
  response.status(200).json({ message: 'Register Route' });
});

registerRouter.post('/', async (request, response) => {
  const { username, firstName, lastName, email, phn, type, rollno, password, T_ID } = request.body;

  // Check if the T_ID already exists
  const existingUser = await User.findOne({ T_ID });
  if (existingUser) {
    return response.status(400).json({ error: 'T_ID already in use' });
  }

  // Hash the password
  const passwordHash = await bcrypt.hash(password, 10);

  // Create new user
  const user = new User({
    username,
    firstName,
    lastName,
    emailID: email,
    phoneNumber: phn,
    userType: type,
    rollNo: rollno,
    passwordHash,
    T_ID,  // Store the T_ID
  });

  try {
    const savedUser = await user.save();
    response.status(201).json({ message: 'User registered successfully', user: savedUser });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: 'Registration failed' });
  }
});

// Login Route
loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body;

  // Find user by username
  const user = await User.findOne({ username });
  if (!user) {
    return response.status(401).json({ error: 'Invalid username or password' });
  }

  // Verify password
  const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
  if (!passwordCorrect) {
    return response.status(401).json({ error: 'Invalid username or password' });
  }

  // Generate JWT token
  const userForToken = {
    T_ID: user.T_ID,
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: '1h' }); // Optionally, set expiration time for token

  response.status(200).send({
    token,
    username: user.username,
    userType: user.userType,
    T_ID: user.T_ID,
  });
});

// Logout Route
 // Since logout is handled on the client-side by removing the token, server responds with success message
logoutRouter.post('/', (request, response) => {
  response.status(200).json({ message: 'Logout successful' });
}
);


module.exports = {
    loginRouter,
    registerRouter,
    logoutRouter
}
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");
const User = require("../models/user");
const sendMail = require("../utils/mail");
require("express-async-errors");

const loginRouter = express.Router();
const logoutRouter = express.Router();
const registerRouter = express.Router();

const admin = require("../utils/firebase"); // Firebase Admin

registerRouter.post("/verify-otp", async (req, res) => {
  const { session, otp } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(session);
    if (!decodedToken) {
      return res.status(400).json({ error: "Invalid OTP or session" });
    }

    res.json({ message: "OTP verified successfully", verified: true });
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({ error: "OTP verification failed" });
  }
});

registerRouter.post("/send-otp", async (req, res) => {
  const { phoneNumber } = req.body;

  try {
    const session = await admin.auth().createSessionCookie(phoneNumber, {
      expiresIn: 5 * 60 * 1000, // OTP valid for 5 minutes
    });

    res.status(200).json({ message: "OTP sent successfully", session });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

// Registration Route
registerRouter.post("/", async (request, response) => {
  const {
    college,
    username,
    firstName,
    lastName,
    email,
    phn,
    type,
    rollno,
    password,
    session, // 🔥 Firebase session from OTP verification
  } = request.body;

  try {
    console.log("Received registration data:", request.body);

    // Validate OTP first
    const decodedToken = await admin.auth().verifyIdToken(session);
    if (!decodedToken || decodedToken.phone_number !== `+91${phn}`) {
      return response.status(400).json({ error: "Invalid OTP" });
    }

    // Validate input
    if (type === "Insider" && !rollno) {
      return response.status(400).json({ error: "Roll number required for Insider users" });
    }

    // Check for existing user
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return response.status(400).json({ error: "Username or Email already in use" });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      username,
      firstName,
      lastName,
      emailID: email,
      phoneNumber: phn,
      userType: type,
      rollNo: type === "Insider" ? rollno : undefined,
      passwordHash,
      college,
    });

    const savedUser = await user.save();

    // Send confirmation email
    const subject = "Registration Confirmation";
    const text = `Dear ${savedUser.firstName},\n\nThank you for registering! Your unique T-ID is: ${savedUser.T_ID}.\n\nBest regards,\nEvent Team`;

    await sendMail(savedUser.emailID, subject, text);

    response.status(201).json({ message: "User registered successfully", user: savedUser });
  } catch (error) {
    console.error("Error during registration:", error);
    response.status(500).json({ error: "Internal server error" });
  }
});


// Login Route
loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return response
        .status(401)
        .json({ error: "Invalid username or password" });
    }

    // Verify password
    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!passwordCorrect) {
      return response
        .status(401)
        .json({ error: "Invalid username or password" });
    }

    // Generate JWT token
    const userForToken = {
      T_ID: user.T_ID,
    };

    const token = jwt.sign(userForToken, process.env.SECRET, {
      expiresIn: "7d", // Token expiration time
    });

    response.status(200).send({
      token,
      username: user.username,
      userType: user.userType,
      T_ID: user.T_ID,
    });
  } catch (error) {
    response.status(500).json({ error: "Internal server error" });
  }
});

// Logout Route
logoutRouter.post("/", (request, response) => {
  // Logout handled client-side by removing the token
  response.status(200).json({ message: "Logout successful" });
});

module.exports = {
  loginRouter,
  registerRouter,
  logoutRouter,
};

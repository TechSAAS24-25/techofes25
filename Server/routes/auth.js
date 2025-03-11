const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");
const User = require("../models/user");
const sendMail = require("../utils/mail");
require("express-async-errors");

const loginRouter = express.Router();
const logoutRouter = express.Router();
const registerRouter = express.Router();

const MAX_ATTEMPTS = 3; // Set limit for failed login attempts

// const admin = require("../utils/firebase"); // Firebase Admin

// registerRouter.post("/verify-otp", async (req, res) => {
//   const { idToken } = req.body;

//   try {
//     // Verify Firebase ID token
//     const decodedToken = await admin.auth().verifyIdToken(idToken);
//     console.log("User authenticated:", decodedToken.uid);

//     // (Optional) Create a session cookie
//     const sessionCookie = await admin.auth().createSessionCookie(idToken, {
//       expiresIn: 5 * 24 * 60 * 60 * 1000, // 5 days
//     });

//     res.status(200).json({ message: "User authenticated", sessionCookie });
//   } catch (error) {
//     console.error("Error verifying OTP:", error);
//     res.status(401).json({ error: "Invalid or expired OTP" });
//   }
// });


// Registration Route
registerRouter.post("/", async (request, response, next) => {
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
    // session, // 🔥 Firebase session from OTP verification
  } = request.body;

  try {
    console.log("Received registration data:", request.body);

    // // Validate OTP first
    // const decodedToken = await admin.auth().verifyIdToken(session);
    // if (!decodedToken || decodedToken.phone_number !== `+91${phn}`) {
    //   return response.status(400).json({ error: "Invalid OTP" });
    // }

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
    const text = `Dear ${savedUser.firstName},\n\nThank you for registering! Your unique T-ID is: ${savedUser.T_ID} and username is: "${savedUser.username}". \n\nBest regards,\nEvent Team`;

    await sendMail(savedUser.emailID, subject, text);

    response.status(201).json({ message: "User registered successfully", user: savedUser });
  } catch (error) {
    console.error("Error during registration:", error);
    next(error);
  }
});


// Login Route
loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      console.log("invalid pwd or username");
      return response
        .status(401)
        .json({ error: "Invalid username or password" });
    }

    // Verify password
    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!passwordCorrect) {
      user.failedAttempts += 1;
      // Lock account if limit reached
      console.log("password wrong");
      if (user.failedAttempts >= MAX_ATTEMPTS) {
        await sendMail(
            user.emailID,
            "Frequent Login Attempts Detected",
            `Dear ${username},\n\nWe noticed multiple failed login attempts on your Techofes account.\n\nIf you need help resetting your password, please let us know.\n\nBest regards,\nSAAS TECH TEAM`
        );
    }

     if ( user.username != "admin" ) { await user.save(); }
      return response
        .status(401)
        .json({ error: "Invalid username or password" });
    }

    // Reset failed attempts
    user.failedAttempts = 0;
    if ( user.username != "admin" ) { await user.save(); }

    console.log("User logged in:", user.username);

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
    console.log("something else happened");
    console.log(error);
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

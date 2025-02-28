const admin = require("firebase-admin");
const credentials = JSON.parse(Buffer.from(process.env.FIREBASE_CREDENTIALS, "base64").toString("utf8"));

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

module.exports = admin;

const functions = require("firebase-functions");
const express = require("express");
const app = express();

// Modules

const api = require("./routes/api");
const auth = require("./routes/auth");

// Routes
app.use("/api", api);
app.use("/auth", auth);


exports.app = functions.https.onRequest(app);

const functions = require("firebase-functions");
const express = require("express");
const app = express();
const cors = require("cors");

// Modules
const api = require("./routes/api");
const auth = require("./routes/auth");
const options = {origin: "*"};
app.use(cors(options));

// Routes
app.use("/api", api);
app.use("/auth", auth);


exports.app = functions.https.onRequest(app);

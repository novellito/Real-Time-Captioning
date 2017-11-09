const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const http = require("http");
//const config = require("./config/database");

// // Connect To Database
// mongoose.connect(config.database);

// // On Connection
// mongoose.connection.on("connected", () => {
//   console.log("Connected to database " + config.database);
// });

// // On Error
// mongoose.connection.on("error", err => {
//   console.log("Database error: " + err);
// });rs

const app = express();
const server = http.Server(app);

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set Static Folder
app.use(express.static(path.join(__dirname, "../dist")));

// Port Number
const port = process.env.PORT || 8080;

// CORS Middleware
app.use(cors());

// app.use(passport.initialize());
// app.use(passport.session());

// require('./config/passport')(passport); passport here just in case we need it

// app.use('/users', users);

// Index Route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.set("port", port);

// Start Server
server.listen(port, () => {
  console.log("Server started on port: " + port);
});

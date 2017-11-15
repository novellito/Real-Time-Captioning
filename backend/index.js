const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const http = require("http");
const app = express();
const server = http.Server(app);
const io = require("socket.io")(server);
mongoose.Promise = global.Promise;

// We import out routes
const AdminRoutes = require("./routes/admins");

// Connect to our mongoDB instance
mongoose.connect(
  "mongodb://localhost/Real-Time",
  { useMongoClient: true },
  err => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected");
    }
  }
);

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set Static Folder
app.use(express.static(path.join(__dirname, "../dist")));

// Port Number
const port = process.env.PORT || 8080;

// CORS Middleware
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());

// Setting up our routes.
app.use("/api/admins", AdminRoutes(io));

// Index Route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.set("port", port);

io.on("connection", socket => {
  console.log("user connected");

  socket.on("disconnect", function() {
    console.log("user disconnected");
  });

  socket.on("add-message", message => {
    console.log(message);
    io.emit("message", { type: "new-message", text: message });
  });
});

// Start Server
server.listen(port, () => {
  console.log("Server started on port: " + port);
});

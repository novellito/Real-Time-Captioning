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
const socketIO = require("./controllers/socket");
mongoose.Promise = global.Promise;

// We import out routes
const AdminRoutes = require("./routes/admins");
const StudentRoutes = require("./routes/students");
const TranscriptRoutes = require("./routes/transcripts");
const ClassRoutes = require("./routes/classes");
const CaptionistRoutes = require("./routes/captionists");
const DownloadRoutes = require("./routes/downloads");
const LoginRoutes = require("./routes/login");

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
app.use("/api/students", StudentRoutes(io));
app.use("/api/transcripts", TranscriptRoutes(io));
app.use("/api/classes", ClassRoutes(io));
app.use("/api/captionists", CaptionistRoutes(io));
app.use("/api/downloads", DownloadRoutes(io));
app.use("/api/login", LoginRoutes(io));

// Index Route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.set("port", port);

io.on("connection", socket => socketIO(socket));

// Start Server
server.listen(port, () => {
  console.log("Server started on port: " + port);
});

module.exports = app;

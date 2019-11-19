const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
require("dotenv").config();
const methodOverride = require("method-override");

const eventsController = require("./controllers/events.js");
const registrationController = require("./controllers/registration.js");
const usersController = require("./controllers/users.js");
const sessionsController = require("./controllers/sessions.js");

const app = express();

//connect to database
mongoose.connect("mongodb://localhost:27017/eventsProject", {
  useNewUrlParser: true
});
mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
  })
);

// Use Controllers and Routes
app.use("/events", eventsController);
// app.use("/registration", registrationController);
app.use("/users", usersController);
app.use("/sessions", sessionsController);

// Routes
app.get("/", (req, res) => {
  //res.render("index.ejs");
  res.render("index.ejs", {
    currentUser: req.session.currentUser
  });
});

app.get("/app", (req, res) => {
  if (req.session.currentUser) {
    res.render("app/index.ejs");
  } else {
    res.redirect("/sessions/new");
  }
});

// Server listening
app.listen(process.env.PORT, () => {
  console.log("listening");
});

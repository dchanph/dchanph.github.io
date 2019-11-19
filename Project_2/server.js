const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const eventsController = require("./controllers/events.js");
const usersController = require("./controllers/users.js");

const app = express();

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
app.use("/users", usersController);
app.use("/users", userController);
app.use("/sessions", sessionsController);

//connect to database
mongoose.connect("mongodb://localhost:27017/eventsProject", {
  useNewUrlParser: true
});
mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});

// Server listening
app.listen(3000, () => {
  console.log("listening");
});

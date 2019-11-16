const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const eventsController = require("./controllers/events.js");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));
// Use Controllers and Routes
app.use("/events", eventsController);

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

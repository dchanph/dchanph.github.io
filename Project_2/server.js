//___________________
//Dependencies
//___________________
const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const app = express();

//___________________
//Port
//___________________
const PORT = process.env.PORT || 3000;

//___________________
//Database
//___________________

// mongoURI = process.env.MONGOURI || "mongodb://localhost/maple_events";

// //connect database - start `mongod`
// mongoose.connect(mongoURI);

// //set the connection for easy access`
// const db = mongoose.connection;

// //  Error messages on console
// db.on("error", console.error.bind(console, "connection error: "));
// db.once("open", function() {
//   console.log("DB: Connected");
// });

//___________________
//Controllers
//___________________
//Add events controller
const eventsController = require("./controllers/events");

//___________________
//Middleware
//___________________
app.use(express.static("public"));

app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/events", eventsController);

//___________________
// Routes
//___________________

// Index  : GET events

//Create New Event
app.get("/events/new", (req, res) => {
  res.render("new.ejs");
});
app.get("/", (req, res) => {
  res.redirect("/events");
});

//Create Post
app.post("/", (req, res) => {
  app.create(req.body, (err, event) => {
    if (err) {
      res.send(err);
    } else {
      res.redirect("/events/" + event.id);
    }
  });
});

//Create Index Route
app.get("/events", (req, res) => {
  res.render("index.ejs");
});

//Render all events
app.get("/events", (req, res) => {
  Event.find({}, (error, allEvents) => {
    res.render;
  });
});


//___________________
//Listener
//___________________
app.listen(PORT, () => console.log("Listening", PORT));

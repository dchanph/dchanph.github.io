//___________________
//Dependencies
//___________________
//require express so we can use router
const express = require("express");
const router = express.Router();

//___________________
//Models
//___________________
//get access to the Events model
const Event = require("../models/events");

//___________________
//Json Route
//___________________
router.get("/json", (req, res) => {
  Event.find((err, events) => {
    res.send(events);
  });
});

//Create New Events
router.get("/events/new", (req, res) => {
  res.render("new.ejs");
});

module.exports = router;

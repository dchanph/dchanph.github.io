//___________________
//Dependencies
//___________________
//require express so we can use router
const express = require("express");
const products = express.Router();

//Create New Events
app.get("/events/new", (req, res) => {
  res.render("new.ejs");
});

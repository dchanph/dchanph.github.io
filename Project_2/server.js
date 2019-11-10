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

//Create New route
app.get("/events/new", (req, res) => {
  res.render("new.ejs");
});

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log("Awesome Events!", PORT));

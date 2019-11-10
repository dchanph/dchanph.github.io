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
//Listener
//___________________
app.listen(PORT, () => console.log("Awesome Events!", PORT));

//___________________
//Database
//___________________

mongoURI = process.env.MONGOURI || "mongodb://localhost/maple_events";

//connect database - start `mongod`
mongoose.connect(mongoURI);

//set the connection for easy access`
const db = mongoose.connection;

//  Error messages on console
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function() {
  console.log("DB: Connected");
});

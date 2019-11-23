const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registrationSchema = mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  first_name: String,
  last_name: String,
  eventID: { type: Schema.Types.ObjectId, ref: "Event" },
  ticketsQty: Number,
  totalCost: Number
});

const Registration = mongoose.model("Registration", registrationSchema);

module.exports = Registration;

//events/:eventsID/registration/new

//___________________
//Dependencies
//___________________
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//___________________
//Set up Schema
//___________________
const eventSchema = new Schema({
  eventID: {
    type: String,
    required: [true, "Please enter event ID."]
  },

  title: {
    type: String,
    required: [true, "Please enter title for event."]
  },
  img: String,
  description: String,
  location: String,
  startDate: Date,
  startTime: String,
  endDate: Date,
  endTime: String,
  price: {
    type: Number,
    min: [0, "Enter 0 if participation is complimentary."]
  },
  maxTickets: {
    type: Number,
    min: [0, "Quantity refers to maximum number of participants for event."]
  }
});

//___________________
//Set up Model
//___________________
const Event = mongoose.model("Event", eventSchema);

//___________________
////Module Exports - access Event in controllers/events.js
//___________________
module.exports = Event;

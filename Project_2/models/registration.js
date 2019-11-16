const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registrationSchema = mongoose.Schema({
  personnelID: String,
  name: String,
  department: String,
  eventID: { type: Schema.Types.ObjectId, ref: "EventID" },
  title: { type: Schema.Types.ObjectId, ref: "Title" },
  price: { type: Schema.Types.ObjectId, ref: "Price" },
  ticketsQty: Number,
  totalCost: {
    type: Number,
    value: price * ticketsQty
  }
});

const Registration = mongoose.model("Registration", registrationSchema);

module.exports = Registration;

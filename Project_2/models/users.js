const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
  first_name: String,
  last_name: String,
  dept: String,
  username: String,
  password: String
});

const User = mongoose.model("User", userSchema);

module.exports = User;

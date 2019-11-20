const bcrypt = require("bcrypt");
const express = require("express");
const sessions = express.Router();
const User = require("../models/users.js");

sessions.get("/new", (req, res) => {
  res.render("sessions/new.ejs", {
    user: null
  });
});

sessions.post("/", (req, res) => {
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (bcrypt.compareSync(req.body.password, foundUser.password)) {
      req.session.currentUser = foundUser;
      res.redirect("/events");
    } else {
      res.send('<a href="/">wrong password</a>');
    }
  });
});

sessions.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/events");
  });
});

module.exports = sessions;

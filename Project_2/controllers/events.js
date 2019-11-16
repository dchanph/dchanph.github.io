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

// Index  : GET    '/events'
router.get("/", (req, res) => {
  Event.find({}, (err, events) => {
    if (err) {
      console.log(err);
    }
    res.render("./organizer/index.ejs", { events });
  });
});

// New    : GET    '/events/new'
router.get("/new", (req, res) => {
  res.render("./organizer/new.ejs");
});

// Show   : GET    '/events/:id'
router.get("/:id", (req, res) => {
  Event.findById(req.params.id, (err, event) => {
    if (err) {
      console.log(err);
    }
    res.render("./organizer/show.ejs", { event: event });
  });
});

// Create : POST   '/events'
router.post("/", (req, res) => {
  Event.create(req.body, (err, event) => {
    if (err) {
      res.send(err);
    } else {
      res.redirect("/events/" + event._id);
    }
  });
});

// Edit   : GET    '/events/:id/edit'
router.get("/:id/edit", (req, res) => {
  Event.findById(req.params.id, (err, event) => {
    if (err) {
      console.log(err);
    }
    res.render("./organizer/edit.ejs", { event: event });
  });
});

// Update : PUT    '/events/:id'
router.put("/:id", (req, res) => {
  Event.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, event) => {
      if (err) {
        console.log(err);
      }
      res.redirect("/events/" + event._id);
    }
  );
});

// Delete : DELETE '/events/:id'
router.delete("/:id", (req, res) => {
  Event.findByIdAndRemove(req.params.id, (err, event) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/events");
  });
});

module.exports = router;

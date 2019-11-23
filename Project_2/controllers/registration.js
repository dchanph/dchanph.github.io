// _________________
// //Dependencies
//___________________
//require express so we can use router
const express = require("express");
const router = express.Router();

//___________________
// //Models
//___________________
// //get access to the Registration model
const Registration = require("../models/registration");
const Event = require("../models/events");

//___________________
//Json Route
//___________________
router.get("/json", (req, res) => {
  Registration.find((err, registrations) => {
    res.send(registrations);
  });
});

// Index  : GET    '/registrations'
router.get("/", (req, res) => {
  Registration.find({}, (err, registrations) => {
    if (err) {
      console.log(err);
    }
    res.render("registration/index.ejs", { registrations });
  });
});

// // New    : GET    '/registrations/new'
// router.get("/new/", (req, res) => {
//   // find all user and then pass the data to render
//   // then in new.ejs --- can use the users found in select tag
//   res.render("registration/new.ejs", {
//     currentUser: req.session.currentUser
//   });
// });

// New    : GET    '/registrations/new'
router.get("/new/:eventID", (req, res) => {
  Event.findById(req.params.eventID, (err, foundEvent) => {
    if (err) {
      console.log(err);
    } else {
      res.render("registration/new.ejs", {
        currentUser: req.session.currentUser,
        event: foundEvent
      });
    }
  });
  // find all user and then pass the data to render
  // then in new.ejs --- can use the users found in select tag
});
// // Show   : GET    '/registrations/:id'
router.get("/:id", (req, res) => {
  Registration.findById(req.params.id, (err, registration) => {
    if (err) {
      console.log(err);
    }
    res.render("registration/show.ejs", { registration: registration });
  });
});

// // Create : POST   '/registration'
router.post("/", (req, res) => {
  console.log(req.body);
  Registration.create(
    {
      user: req.body.user,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      eventID: req.body.eventID,
      ticketsQty: req.body.ticketsQty,
      totalCost: 10
    },
    (err, registration) => {
      if (err) {
        res.send(err);
      } else {
        res.redirect("/events");
      }
    }
  );
});

// // Edit   : GET    '/registration/:id/edit'
router.get("/:id/edit", (req, res) => {
  Registration.findById(req.params.id, (err, registration) => {
    if (err) {
      console.log(err);
    }
    res.render("registration/edit.ejs", { registration: registration });
  });
});

// // Update : PUT    '/registrations/:id'
router.put("/:id", (req, res) => {
  Registration.findByIdAndUpdate(
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

// // Delete : DELETE '/registrations/:id'
router.delete("/:id", (req, res) => {
  Registration.findByIdAndRemove(req.params.id, (err, registration) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/events");
  });
});

module.exports = router;

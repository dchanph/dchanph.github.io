const express = require("express");
const app = express();

//Create New route
app.get("/events/new", (req, res) => {
  res.send("new");
});

app.listen(3000, () => {
  console.log("listening");
});

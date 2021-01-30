require("dotenv").config();
const express = require("express");
const app = express();
const Port = process.env.PORT || 3009;

// get all restaurants
app.get("/api/v1/restaurants", (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      restaurants: ["Starbuck", "Mcdonald", "KFC"],
    },
  });
});

// Get a restaurant
app.get("/api/v1/restaurants/:restaurantsid", (req, res) => {
  console.log(req.params);
});

// Create a Restaurant
app.post("/api/v1/restaurants", (req, res) => {
  console.log(req);
});

app.listen(Port, () => {
  console.log(`server is up and listening on port ${Port}`);
});

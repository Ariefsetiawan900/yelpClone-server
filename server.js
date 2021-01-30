require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const Port = process.env.PORT || 3009;

app.use(morgan("tiny"));
app.use(express.json());
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
app.get("/api/v1/restaurants/:id", (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      restaurants: "Mcdonald",
    },
  });
  console.log(req.params);
});

// Create a Restaurant
app.post("/api/v1/restaurants", (req, res) => {
  res.status(201).json({
    status: "success",
    data: {
      restaurants: "Mcdonald",
    },
  });
  console.log(req.body);
});

// Update data a restaurant
app.put("/api/v1/restaurants/:id", (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      restaurants: "Mcdonald",
    },
  });

  console.log(req.params.id);
  console.log(req.body);
});

// Delete a restaurant
app.delete("/api/v1/restaurants/:id", (req, res) => {
  res.status(204).json({
    status: "success",
  });
});

app.listen(Port, () => {
  console.log(`server is up and listening on port ${Port}`);
});

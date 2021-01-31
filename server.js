require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const Port = process.env.PORT || 4000;
const db = require("./db");

app.use(morgan("tiny"));
app.use(express.json());

// get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM restaurants");
    console.log(result);
    res.status(200).json({
      status: "success",
      result: result.rows.length,
      data: {
        restaurants: result.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Get a restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query("SELECT * FROM restaurants WHERE id = $1", [
      id,
    ]);
    res.status(200).json({
      status: "success",
      data: {
        restaurants: result.rows[0],
      },
    });
  } catch (err) {
    console.log(err.message);
  }

  //   console.log(req.params);
});

// Create a Restaurant
app.post("/api/v1/restaurants", async (req, res) => {
  try {
    const { name, location, price_range } = req.body;
    const result = await db.query(
      "INSERT INTO restaurants (name, location, price_range) VALUES ($1,$2,$3) RETURNING *",
      [name, location, price_range]
    );

    // console.log(result);
    res.status(201).json({
      status: "success",
      data: {
        restaurants: result.rows[0],
      },
    });
  } catch (err) {
    console.log(err.message);
  }
});

// Update data a restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, price_range } = req.body;
    const result = await db.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *",
      [name, location, price_range, id]
    );

    // console.log(result);
    res.status(200).json({
      status: "success",
      data: {
        restaurants: result.rows[0],
      },
    });
  } catch (err) {
    console.log(err.message);
  }
});

// Delete a restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query("DELETE FROM restaurants WHERE id = $1", [
      id,
    ]);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(Port, () => {
  console.log(`server is up and listening on port ${Port}`);
});

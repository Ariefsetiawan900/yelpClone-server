require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const Port = process.env.PORT || 4000;
const db = require("./db");

app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());

// get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM restaurants");

    const restaurantRatingData = await db.query(
      "select * from restaurants  left join (select restaurants_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurants_id ) reviews on restaurants.id = reviews.restaurants_id;"
    );

    // console.log("Result", result);
    // console.log("Restaurant data", restaurantRatingData);

    res.status(200).json({
      status: "success",
      result: restaurantRatingData.rows.length,
      data: {
        restaurants: restaurantRatingData.rows,
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
    // const restaurants = await db.query(
    //   "SELECT * FROM restaurants WHERE id = $1",
    //   [id]
    // );

    const restaurants = await db.query(
      "Select * from restaurants  left join (select restaurants_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurants_id ) reviews on restaurants.id = reviews.restaurants_id where id = $1;",
      [id]
    );

    const reviews = await db.query(
      "SELECT * FROM reviews WHERE restaurants_id = $1",
      [id]
    );

    res.status(200).json({
      status: "success",
      data: {
        restaurants: restaurants.rows[0],
        reviews: reviews.rows,
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

// add  a review
app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, review, rating } = req.body;

    const newReview = await db.query(
      "INSERT INTO reviews (restaurants_id, name, review, rating) VALUES ($1, $2, $3, $4) RETURNING *;",
      [id, name, review, rating]
    );

    console.log(newReview);
    res.status(201).json({
      status: "Success",
      data: {
        review: newReview.rows[0],
      },
    });
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(Port, () => {
  console.log(`server is up and listening on port ${Port}`);
});

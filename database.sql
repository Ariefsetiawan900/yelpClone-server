CREATE DATABASE yelpClone;
-- Main Table 

CREATE TABLE restaurants (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INT NOT NULL check(price_range >= 1 and price_range <= 5)
);

INSERT INTO restaurants (name, location, price_range) VALUES ('sate', 'indo', 4);
SELECT * FROM reviews
DROP TABLE *

-- Second Table

CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurants_id  BIGINT NOT NULL REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL check(rating >= 1 and rating <= 5)
);

INSERT INTO reviews (restaurants_id, name, review, rating) VALUES (13, 'bang jago', 'wueenak tenan iki', 4);

-- count total rating
Select * from restaurants  left join (select restaurants_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurants_id ) reviews on restaurants.id = reviews. restaurants_id;

-- get a data 
Select * from restaurants  left join (select restaurants_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurants_id ) reviews on restaurants.id = reviews.restaurants_id where id = 17;
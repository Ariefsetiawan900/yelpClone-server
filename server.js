require("dotenv").config();
const express = require("express");
const app = express();
const Port = process.env.PORT || 3009;

app.get('/getRestaurants',(req,res)=>{
    res.json({
        status:"success",
        restaurants:"mcdonald"
    })
})

app.listen(Port, () => {
  console.log(`server is up and listening on port ${Port}`);
});

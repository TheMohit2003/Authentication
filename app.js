const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.use(express.static("/public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));


app.listen(3000,(req,res)=>{
    console.log("the server is running on port 3000")
})
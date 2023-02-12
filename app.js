require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose")
const app = express();
const encrypt = require('mongoose-encryption');

app.use(express.static("/public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

main().catch(err => console.log(err));
async function main() {
    mongoose.set('strictQuery', true)    
    await mongoose.connect('mongodb://127.0.0.1:27017/userDB');
}

const userSchema = new mongoose.Schema({
    email:String,
    password:String
})

const secret = process.env.SECRET
userSchema.plugin(encrypt, { secret: secret , encryptedFields:['password']});

const User = new mongoose.model("User",userSchema);

app.get("/",(req,res)=>{
    res.render("home");
})

app.get("/login",(req,res)=>{
    res.render("login");
})

app.get("/register",(req,res)=>{
    res.render("register");
})

app.post("/register",(req,res)=>{
    const newUser = new User({
        email:req.body.username,
        password:req.body.password
    })
    newUser.save((err)=>{
        if(err){
            console.log(err)
        }else{
            res.render("secrets")
        }
    });
});

app.post("/login",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({email:username},(err,foundUsername)=>{
        if(err){
            console.log(err)
        }else{
            if(foundUsername.password===password){
                res.render("secrets")
            }
        }
    })
})

app.listen(3000,(req,res)=>{
    console.log("the server is running on port 3000")
})
const express = require("express");
require('dotenv').config();
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const cookieParser = require('cookie-parser');
const checkUser = require('./Middleware/protect');


const app = express();
const PORT = process.env.PORT;
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cookieParser());
app.use(checkUser());

const userRoute = require('./Routes/userRoute')

app.get('/',(req, res)=>{
    if (!req.user){
        return res.redirect('/user/login');
    }
    return res.render("home",{user: req.user});
})
app.use('/user',userRoute);




mongoose.connect("mongodb://localhost:27017/blog")
.then(()=>{console.log("mongodb connected successfully")})
app.listen(PORT,()=>{console.log(`Server is running on port ${PORT}`)})
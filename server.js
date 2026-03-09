const express = require("express");
require('dotenv').config();
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const cookieParser = require('cookie-parser');
const checkUser = require('./Middleware/protect');//Imports a custom middleware.This probably checks whether the user is logged in or not.
const Blog = require('./Models/Blog');//Imports the Blog model.Used to interact with the blogs collection in MongoDB.

const app = express();
const PORT = process.env.PORT;
app.set("view engine","ejs");//Express will render .ejs files automatically.
app.use(express.json());//Parses JSON data sent from frontend.
app.use(express.urlencoded({extended: false}))//Parses form data sent from HTML forms.
app.use(cookieParser());//Allows access to cookies.
app.use(checkUser());//Runs checkUser middleware on every request.Likely checks if a user token exists.
app.use("/uploads",express.static(path.resolve("uploads")));//Serves uploaded files publicly.

const userRoute = require('./Routes/userRoute');
const blogRoute = require('./Routes/blogRoute');

app.get('/',async (req, res)=>{
const blogs = await Blog.find({});//find({}) means get all blogs.
    
    return res.render("home",{user: req.user, blogs: blogs});
})
app.use('/user',userRoute);
app.use('/blog',blogRoute);




mongoose.connect(process.env.MONGO_URI)
.then(()=>{console.log("mongodb connected successfully")})
app.listen(PORT,()=>{console.log(`Server is running on port ${PORT}`)})
const User = require('../Models/User');//Imports the User model from the Models folder.
const {generateUserToken} = require('../Services/auth');//Imports a function that creates an authentication token (usually JWT).This token helps identify logged-in users.
const handleUserSignup = async (req , res)=>{
    try{
        const {name, email, password} = req.body;
        console.log(name,email,password);
        const user = await User.findOne({email});
        if(user){
            return res.render('signup', {error: 'Email already registered'});
        }
        
        await User.create({email, name, password});
        return res.redirect('/');

    }
    catch( error){
        console.error(error);
        return res.render('signup', {error: 'Signup failed. Please try again'});
    }
}

const handleUserLogin = async (req, res)=>{
try{
const {email, password} = req.body;
const user = await User.checkUserPassword(email, password);//Creates an authentication token for that user.
const token = generateUserToken(user);
res.cookie("token",token);//Stores the token in a browser cookie.This helps keep the user logged in.

return res.redirect('/');
}catch(error){
    return res.render('login',{error: error})
}
}


module.exports = {handleUserSignup, handleUserLogin}
const express = require('express');
const router = express.Router();

const {handleUserSignup, handleUserLogin} = require('../Controllers/userController');

router.get('/login',(req, res)=>{
    return res.render('login',{user: null});
});
router.get('/signup',(req, res)=>{
    return res.render('signup',{user: null});
});

router.post('/login', handleUserLogin);
router.post('/signup',handleUserSignup);
router.get('/logout',(req, res)=>{
    res.clearCookie("token").redirect('/')
});


module.exports = router;
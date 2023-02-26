const cookieParser = require('cookie-parser');
const { register } = require('../services/userServices')
const authController = require('express').Router();

authController.get('/register',(req,res)=>{
    res.render('register');
})

authController.post('/register',async(req,res)=>{
    console.log(req.body);
    const token = await register(req.body.username,req.body.password)
    res.cookie('tokenSession',token)
    res.redirect('/auth/register')
})

module.exports = authController
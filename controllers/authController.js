const cookieParser = require('cookie-parser');
const { register, login } = require('../services/userServices')
const authController = require('express').Router();

authController.get('/register', (req, res) => {
    res.render('register');
})

authController.post('/register', async (req, res) => {
    console.log(req.body);
    try{  const token = await register(req.body.email,req.body.username, req.body.password)
        res.cookie('tokenSession', token)
        res.redirect('/')}
    catch(err){
        console.log(err);
        res.redirect('/register')
    }
})

authController.get('/login', (req, res) => {
    res.render('login')
})

authController.post('/login', async (req, res) => {
    try{const token = await login(req.body.email, req.body.password);
    res.cookie('tokenSession',token)
    res.redirect('/')}
    catch(err){
        console.log(err);
        res.redirect('/login')
    }
})

authController.get('/logout', (req,res)=> {
    res.clearCookie('tokenSession');
    res.redirect('/')
})
module.exports = authController
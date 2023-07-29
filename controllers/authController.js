const cookieParser = require('cookie-parser');
const { register, login } = require('../services/userServices')
const authController = require('express').Router();

authController.get('/register', (req, res) => {
    res.render('register');
})

authController.post('/register', async(req, res) => {
    console.log(req.body);
    try {
        if (req.body.password == '' || req.body.username == '') {
            throw new Error('All fields are required');
        }
        const token = await register(req.body.username, req.body.password)
        res.cookie('tokenSession', token);
        if (req.body.password != req.body.repassword) {
            throw new Error('Password dont match');
        }
        res.redirect('/');
    } catch (error) {
        const errors = [error.message]
        res.render('register', { errors });
    }
})

authController.get('/login', (req, res) => {
    res.render('login');
})

authController.post('/login', async(req, res) => {
    try {
        if (req.body.password == '' || req.body.username == '') {
            throw new Error('All fields are required');
        }

        const token = await login(req.body.username, req.body.password);
        res.cookie('tokenSession', token)
        res.redirect('/')
    } catch (error) {
        const errors = [error.message];
        res.render('login', { errors });
    }
})

authController.get('/logout', (req, res) => {
    res.clearCookie('tokenSession');
    res.redirect('/')
})
module.exports = authController
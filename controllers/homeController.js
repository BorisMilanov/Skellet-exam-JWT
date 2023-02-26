const homeController = require('express').Router();

homeController.get('/', async(req,res)=>{
    res.render('home')
})

module.exports = homeController;
const { urlencoded } = require('express');
const express = require('express');
const {engine} = require('express-handlebars');
const exphbs = require('express-handlebars');
const handlebars = exphbs.create({extname:'.hbs'});
const cookieParser = require('cookie-parser')
module.exports = (app) => {
  
    app.engine('.hbs', handlebars.engine);
    app.set('view engine', '.hbs');
   
    app.use('/static',express.static('static'));
    app.use(express.urlencoded({extended:true}));

    app.use(cookieParser())
}
const app = require('express').Router();
const mw = require('../config/Middlewares');

//Welcome route
app.get('/welcome',mw.NotLoggedIn,(req,res) => {
  let options = {title: 'Welcome'};
  res.json('welcome',{options})
});

//404 Route
 app.get('/404',mw.LoggedIn,(req,res) => {
     let options = {title: 'Oops!! Error'}
     res.render('404',{options})
 });

 //Help route
 app.get('/help', (req,res) => {
     let options = {title: 'Help'};
     res.json('help',{options})
 });

 //Delevoper route
 app.get('/developer',(req,res) => {
     let options = {title: 'Developer'}
     res.json('developer',{options})
 });

 //About route
 app.get('/about', (req,res) => {
     let options = {title: 'about'};
     res.json('about',{options})
 });

 //Route for logged in user[react is render by this route]
 app.get('*',mw.LoggedIn,(req,res) => {
    let options = {title: '📸'};
    res.render('app',{options})
 });

 module.exports = app;


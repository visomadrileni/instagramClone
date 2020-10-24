const route = require('express').Router(),
      User = require('../../model/User'),
      {uniqBy} = require('lodash'),
      mw = require('../../config/Middlewares'),
     {catchError} = require('../../utils/error'),
     {check,validationResult} = require('express-validator');

 //User loggin get route
 route.get('/login', mw.NotLoggedIn,(req,res) => {
     let options = {
         title: 'Login to Continue',
         users: req.cookies.users ? JSON.parse(req.cookies.users).slice(0,15) : []
     };
     res.status(200).render('login',{options})
 });

 //Logs the user in
 route.post('/login',[ check('username','Username is empty').notEmpty(),check('password','Password field is empty').notEmpty()],async (req,res) => {
     try{  //(In app.js I set cookieName: 'session') we refer as req.session because if we will set cookieName: 'mysession' so we will refer as req.mysession
         const {body: {username,password},session } = req;
   
         let errors = validationResult(req);
         if(!errors.isEmpty()){
             let array = [];
             errors.array().forEach(e => array.push(e.msg));
             res.json({ message: array })
         }else{
             User.findOne({username:username},(err,user) => {
                 if(err){
                     console.log(err);
                    res.json({message: 'User not found'})
                 } else if(user){
                     let isMatch = user.comparePassword(password);
                     if(!isMatch){
                        res.json({ message: 'Wrong password'})
                     } else {
                        const {id,username,email} = user;
                        session.id = id; 
                        session.username = username;
                        session.email_verified = email,
                        session.isadmin = false;

                        User.updateMany({id:id,isOnline:'yes'});
                        res.json({
                            success: true,
                            message: `Welcome ${username}`
                        })
                     }
                 }
             });
        }
     }catch(error){
         catchError(error,res);
     }
 });

 //Logs user out
 route.get('/logout', mw.LoggedIn, async (req,res) => {
     try{
         const {id,username} = req.session, //we save id and username to session part to save as cookies(in server we can refer as req.cookies)
               user = {id,username};
         let oldUsers = req.cookies.users ? JSON.parse(req.cookies.users) : [], //with JSON.parse() the data becomes a JavaScript object.
             users = [];

         oldUsers.map(u => users.push(u)); 
         let final = uniqBy([user,...users],'id');   //It would iterate over all old users and new user by id
         res.cookies('users',`${JSON.stringify(final)}`);  //Sets a cookie with name(name) and value(value) to be sent along with the response.

        User.findOneAndUpdate({user_details:{id:id}},{$set:{user_details:{isOnline: 'no',lastOnline: new Date().getTime()}}},{upsert:true});
        let url = req.session.reset() ? '/login' : '/';
        res.redirect(url);
     }catch(error){
         console.log(error);
     }
 });

 module.exports = route;
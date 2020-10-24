const route = require('express').Router(),
      User = require('../../model/User'),
      mw = require('../../config/Middlewares'),
      {check,validationResult} = require('express-validator');

 //Forgot password
  route.get('/forgot-password', mw.LoggedIn, (req,res) => {
      let options = { title: 'Forgot Password'}
      res.render('forgotPassword',{options})
  });

  //Retrive password
  route.post('user/retrieve-password',[check('email','Email is empty').notEmpty(),check('email','Invalid email').isEmail()], async (req,res) => {
      const {email} = req.body;

      let errors = validationResult(req);
      if(!errors.isEmpty()){
          let array = [];
          errors.array().forEach(e => array.push(e.msg));
          res.json({ message: array})
      } else {
              User.findOne({user_details:{email:email}},(err,user) => {
              if(err){
                 res.json({ message: 'No such user exists' })
              } else{
                const {id,username,email} = user;
                req.session.id = id;
                req.session.username = username;
                req.session.email_verified = email;
  
                res.json({
                    success: true,
                    message: 'Successful'
                })
              }
          })
        }
  });

  //User password change
  route.post('/user/change-password',  [check('old','Old password is empty').notEmpty(),check('new_','New password field is empty').notEmpty(),check('new_a','New password field is empty').notEmpty()],async (req,res) => {
      const {old,new_,new_a} = req.body,
            {id} = req.session;                                 //Above we save id in '/retrieve-password' route 
  
      let errors = validationResult(req);
      if(!errors.isEmpty()){
          let array = [];
          errors.array().forEach(e => array.push(e.msg));
          res.json({ message: array})
       }else{
            User.findById({user_details:{id:id}},(err,user) => {
              if(err){
                res.json({ message: 'No such user exists' })
              } else {
                 let isMatch = user.comparePassword(old);
                 if(!isMatch){
                    res.json({ message: 'Incorrect Password'})
                 } else if(new_ !== new_a){
                    res.json({message: 'New passwords dont match'})
                 } else {
                    user.updateOne({user_details:{password:new_}});
                    res.json({
                        success: true,
                        message: 'Password changed'
                    })
                 }
              }
          })
        }
  });

  module.exports = route;
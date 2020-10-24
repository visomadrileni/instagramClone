const route = require('express').Router();
const User = require('../../../model/User');
const Follow = require('../../../model/Follow');
const Post = require('../../../model/Post');
const {mail} = require('../../../config/Mail');
const {check,validationResult} = require('express-validator');

//Return the count of a given field such('/api/what-exists')
route.post('/what-exists', async (req,res) => {
    const {what,value} = req.body;
    User.find({user_details:{what:value}});
});

//Edit profile [req= ...]
route.post('/edit-profile', [check('email','Email is empty').notEmpty(),check('email','Email is invalid').isEmail()], async (req,res) => {
    let {username,firstname,surname,email,bio,twitter,instagram,facebook,github,website,phone,tags} = req.body;
    let {id} = req.session;

   //filter illegal characters
   let replacer = /[^a-z0-9_.@$#]/g
   username = username.replace(replacer,'');
   firstname = firstname.replace(replacer,'');
   surname = surname.replace(replacer,'');
   
   db.c_validator('username',req);
   db.c_validator('firstname',req);
   db.c_validator('surname',req);

   let errors = validationResult(req);
   if(!errors.isEmpty()){
       let array = [];
       errors.array().forEach(e => array.push(e.msg));
       res.json({message:array})
   }else{
       req.session.username = username;
       User.updateMany({user_details:{username,firstname,surname,email,bio,instagram,twitter,github,facebook,website,phone,id}});
       Follow.updateMany({followers:{follow_by_username:username,follow_by:id}});
       Follow.updateMany({followers:{follow_by_username:username,follow_to:id}});
       Post.findByIdAndRemove({tags:{user:id}});

      tags.forEach(async t => await Post.create({user:t.user,tag: t.tag}).save());   
      res.json({
          success: true,
          message: 'Profile updated'
      })
   }
});

//For resending the verification link
route.post('/resend-verification-link', async (req,res) => {
    let {id} = req.session;
    User.findOne({session:{id}},(err,user) => {
        if(user){
            const {user_details:{username,email}} = user;
            url = `http://localhost:${process.env.PORT}/deep/most/topmost/activate/${id}`,
            options = {
                to: email,
                subject: 'Activate your instagram account',
                html: `<span>Hello ${username}, You received this message because you created an account on Instagram.<span><br><span>Click on button below to activate your account and explore.</span><br><br><a href='${url}' style='border: 1px solid #1b9be9; font-weight: 600; color: #fff; border-radius: 3px; cursor: pointer; outline: none; background: #1b9be9; padding: 4px 15px; display: inline-block; text-decoration: none;'>Activate</a>`
               };
        
                mail(options);
                res.json({ message: 'Verification link is sent to your email'  })
            }else{
            res.json({ message: 'Mail couldd not be sent' })
        }
    })
});

//Change account type [req=type]
 route.post('/change-account-type', async (req,res) => {
     const {type} = req.body,
           {id} = req.session;
     User.findByIdAndUpdate({session:{id}},{account_type:type});
     res.json('You changed your type of instagram account')
 });

 module.exports = route;

























const route = require('express').Router(),
      User = require('../../model/User'),
      mw = require('../../config/Middlewares'),
      {deactivate} = require('../../utils/deactivate'),
      {check,validationResult} = require('express-validator');

 //Checks if username exists when registering
 route.post('/user/username-checker', async (req,res) => {
   let existOr = User.find({user_details:{username:req.body.value}}).exec((err,res) =>{
         if(res.length === 1){
             return true;
         }else{
             return false;
         }
     });
     res.json(existOr);
 });

 //User is redirected to this route after registration
 route.get('/registered', mw.LoggedIn, async (req,res) => {
     const {id} = req.session; //this is mozilla client-session library that let us to store a user’s information inside a file on their browser,use to store cookies(id in this example )
     User.findOne({user_details:{id:id}},(err,user) => {
        let options = {
            title: 'Registered',
            message: 'Email has been sent.Check your inbox and click the link'
        };
   
        user.email_verified === 'yes' ? res.redirect('/') : res.render('registered',{options})
     });
 });

 //User email verification
 route.get(`/deep/most/topmost/activate/:id`, async (req,res) => {
     const {params: {id},session} = req;
     User.findByIdAndUpdate({user_details:{id:id}},{$set:{email_verified:'yes'}},{upsert:true},(err,user) => {
        session.email_verified === 'yes'
        let message = user.isModified === 0 ? 'alr' : 'yes'
        res.redirect(`/email-verification/${message}`)
     });
 });

//User deactivate account
route.post('/user/deactivate-account',[check('password','Password is empty').notEmpty()], async (req,res) => {
    const {id} = req.session,
        {password} = req.body;

    let errors = validationResult(req);
    if(!errors.isEmpty()){
        let array = [];
        errors.array().forEach(e => array.push(e.msg));
        res.json({ message: array})
    } else {
         User.findById({user_details:{id:id}},(err,user) => {
            if(user){
               let samePassword = user.comparePassword(password);
               if(!samePassword){
                  res.json({ message: 'Wrong password'})
                } else {
                 deactivate(user,req,res);
                res.json({
                    success: true,
                    message: 'Deactivated process of your account run successfully'
                })
               }}
        })
    }
});

//Remove user [action done by the admin]
route.post('/user/remove-user', async (req,res) => {
    const {user} = req.body;
    User.getWhat({user_details:{username:user}},(err,user) => {
        if(user){
            deactivate(user,req,res);
            res.json({
                success: true,
                message: `Removed ${user.username}`
            })
        }
    });
});

module.exports = route;

















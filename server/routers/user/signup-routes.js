
const route = require('express').Router(),
      dir = process.cwd(), // returns the current working directory
      fs = require('fs'),
      {promisify} = require('util'),
      User = require('../../model/User'),
      {mail} = require('../../config/Mail'),
      mw = require('../../config/Middlewares'),
      {success} = require('../../utils/handy-log'),
      {check,validationResult} = require('express-validator');
    
 
const sendMailAndCreateDir = async (insertId,username,email,res) => {
    let mkdir = promisify(fs.mkdir);
        mkdir(`${dir}/dist/users/${insertId}`);
    fs.createReadStream(`${dir}/dist/images/spacecraft.jpg`).pipe(fs.createWriteStream(`${dir}/dist/users/${insertId}/avatar.jpg`));
    let url = `http://localhost:${process.env.PORT}/deep/most/topmost/activate/${insertId}`;
    let options = {
        to: email,
        subject: 'Activate your instagra account',
        html: `<span>Hello ${username}, You received this message because you created an account on Instagram.<span>
        <br><span>Click on button below to activate your account and explore.</span><br><br>
        <a href='${url}' style='border: 1px solid #1b9be9; font-weight: 600; color: #fff; border-radius: 3px; 
        cursor: pointer; outline: none; background: #1b9be9; padding: 4px 15px; display: inline-block; 
        text-decoration: none;'>Activate</a>`
    };

    try{
        let m = mail(options);
        success(m);
        res.json({
            success: true,
            message: `Hello ${username}`
        })
    }catch(error){
        res.json({
            success: true,
            message: `Hello ${username} email could not be sent`
        })
    }
}

//User signup get route
route.get('/signup',mw.NotLoggedIn,(req,res) => {
    let options = {title: 'Signup for free'};
    res.render('signup',{options})
});

//Register a user
route.post('/signup',[check('email','Email is empty').notEmpty(),check('email','Invalid email').isEmail(),
      check('password','Password field is empty').notEmpty()], async (req,res) => {
    try{
        const {body: {username,firstname,surname,email,password},session} = req;

        let errors = validationResult(req);
        if(!errors.isEmpty()){
            let array = [];
            errors.array().forEach(e => array.push(e.msg));
            res.json({ message: array})
        } else {
               User.findOne({username:username,email:email},(err,user) => {
                if(user){
                    res.json({message:'This user exist'});
                }else{
                    let newUser = new User({
                        username:username,
                        firstname:firstname,
                        surname:surname,
                        email:email,
                        password:password,
                        joined: new Date().getTime()
                    });
               
               newUser.markModified('object');
               newUser.save((err,userSaved) => {
                   if(err){
                       console.log('An error is occurred',err)
                   }else{
                       res.status(200).json(userSaved) 
                   }
               });
             }                        
         });
       }
    }catch(error){
        console.log(error);
        res.status(500).json({ message: 'An error has occured'});
    }
});

module.exports = route;
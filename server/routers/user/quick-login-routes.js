 const route = require('express').Router();
 
 //Remove quick login(when you have to provide password,username that is stored in cookies)
 route.post('/remove-quick-login',(req,res) => {
     let users = JSON.parse(req.cookies.users); //makes again an javascript Object
     let filtered = users.filter(u => u.id !== req.body.id);

     res.cookie('users',`${JSON.stringify(filtered)}`); //save all users cookies(as string now to save all except u.id)
     res.json('Login again')
 });

 //Clear all quick login 
 route.post('/clear-all-quick-logins', (req,res) => {
     res.clearCookie('users'); //refer to cookies save above
     res.json('In this app we use cookies, to help you search you have to accept cookies')
 });

 module.exports = route;
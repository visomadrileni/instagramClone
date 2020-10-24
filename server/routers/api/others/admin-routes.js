const route = require('express').Router();

//Checks if user is admin [req=password]
route.post('/check=is-admin', async (req,res) => {
    let {password} = req.body,
    {ADMIN_PASSWORD} = process.env;

    if(password !== ADMIN_PASSWORD){
        res.json({message: 'Wrong password'})
    }else{
        req.session.isadmin = true;
        res.json({
            message: `Hello admin ${ADMIN_PASSWORD}`,
            success: true
        })
    }
});

//Admin logout
route.post('/admin-logout', async (req,res) => {
    req.session.isadmin = false;
    res.json('You have to log in');
});

module.exports = route;
//Creating local variables
const variables = (req,res,next) => {
    let loggedIn = req.session.id ? true : false;
    res.locals.loggedIn = loggedIn;
    res.locals.session = req.session;
    next();
}

//For logged in users only
const LoggedIn = (req,res,next) => {
    !req.session.id ? res.redirect('/login') : next()
}

//For not-loggedIn users only 
const NotLoggedIn = (req,res,next) =>{
    req.session.id ? res.redirect('/') : next()
};

module.exports = {
    variables,
    LoggedIn,
    NotLoggedIn
};
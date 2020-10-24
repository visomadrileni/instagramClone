 const route = require('express').Router();
 const User = require('../../../model/User');
 const Follow = require('../../../model/Follow');
 const {catchError} = require('../../../utils/error');


//Add to favourite [req=user]
route.post('/add-to-favourites', async (req,res) => {
    let respObj = {};

    try{
        const {user} = req.body,
              {id} = req.session;

        User.findById(id,(err,me) => {
            if(me){
                    let isBlocked = m.blockedUser.map(blckUser => blckUser.user === user)
                    let isFavourite = me.toFollow.favourites.map(f => f.user === user);
                    if(!isBlocked){
                        if(!isFavourite){
                            Follow.create({favourites:{
                                   fav_by:id,
                                   user,
                                  fav_time: new Date().getTime()
                               }}).save();

                            respObj = {
                                success: true,
                                message: `Added ${username} to favourites`
                            };
                        } else {
                            respObj = {message: `Already exists ${user.username} to yours favourites` }
                     } 
              }}       
         })
      }catch(error){
        console.log(error);
        respObj = {message: 'An error has occurred'}
      }
    res.json(respObj);
});

//Remove from favourites [req=fav_id]
route.post('/remove-favourites', async (req,res) => {
    try{
        Follow.findOneAndRemove({favourites:{fav_id:req.body.fav_id}});
        res.json({success: true})
    }catch(error){
        catchError(error,res)
    }
});

module.exports = route;

const route = require('express').Router(),
      User = require('../../../model/User'),
      Follow = require('../../../model/Follow'),
      {catchError} = require('../../../utils/error');

//To check if session following user [req=username]
route.post('/is-following', async (req,res) => {
    const {body:{username},session:{id}} = req;

    User.findById({user_details:{id:id}},(err,user) => {
      let is = Follow.find({followers:{follow_by_username:username,follow_to:user}}).limit(1).exec((err,isFollowing) => {
          if(isFollowing.length === 1){
            return {is:true}
          }else{
         return {is:false}
        }
       });
       res.json(is);
    })
})

//Follow user [req=user,username]
route.post('/follow', async (req,res) => {
    let respObj = {};

    try{
        const {user,username} = req.body,
              {id: session,username: session_username } = req.session;
        let isFollowing = Follow.find({followings:{follow_by:session,follow_to:user}}).limit(1),
            isBlocked = User.isBlocked({blockedUsers:{block_by:session,user}}).limit(1).exec((err,res) =>  res.length);

        if(!isBlocked){
            if(!isFollowing){
                let newFollow = Follow.create({followings:{
                                    follow_by: session,
                                    follow_by_username: session_username,
                                    follow_to: user,
                                    follow_to_username: user,
                                    follow_time: `${new Date().getTime()}`
                                }}).save();

                const user = User.findById({id:session});
                const {firstname,surname} = user;
                respObj = {
                    message: `Followed ${username}`,
                    success: true,
                    ff: {
                        follow_id: newFollow._id,
                        follow_by: session,
                        username: session_username,
                        firstname,
                        surname,
                        follow_to: user,
                        follow_time: newFollow.follow_time
                    }
                };               
            }else{
                respObj = {
                    message: `Already followed ${username} `
                }
            }
        }else{
            respObj = {
                message: `Could not follow ${username}` 
            }
        }

      res.json(respObj);
    }catch(error){
        console.log(error)
    }
});

//Unfollow user [req=user]
route.post('/unfollow-user', async (req,res) => {
    try{
        const {session:id,body:user} = req;
        User.findById({user_details:{id}},(err,me) => {
             Follow.findByIdAndRemove({followings:{follow_by:me,follow_to:user}})
        });
        res.json({
            success: true,
            message: 'Unfollowed'
        })
    }catch(error){
        catchError(error,res);
    }
});

//View profile [req=username]
route.post('/view-profile', async (req,res) => {
    const {username} = req.body,
          {id} = req.session;

      User.findById({user_details:{id:id}},(err,user) => {
        if(user){
           let dtime = user.startTime - user.endTime;
           time = parseInt(new Date().getTime() - parseInt(dtime))

           //2.5min or 150000ms
           if(time >= 150000 || !dtime){
             let insert = {
                 view_by: user,
                 view_to: username,
                 view_time: new Date().getTime()
             };
       
            Follow.findOneAndUpdate({followings:{follow_to:username}},{$set:{profile_views:insert}});
           }
        }
    })

    res.json(`This follower ${username} have seen your profile and photos `)
});

//Get followrs [req=user]
route.post('/get-followers', async (req,res) => {
     User.find({username:req.body.user},(err,user) => {
        if(user){
            return user.toFollow.followers;
        }
    })
});

//Get followings [req=user]
route.post('/get-followings', async (req,res) => {
    User.find({user_details:{username:req.body.user}},(err,user) => {
        if(user){
            return user.toFollow.followings;
        }
    })
});

//Get user stats [followers/followings etc]
route.post('/get-user-stats', async (req,res) => {
     const {username} = req.body;
     let recomm = [];

      User.findOne({user_details:{username:username}},(err,user) => {
         const {followers,followings,views_count,recommendations} = user.toFollow;
         for(let r of _recommendations){
            recomm.push({
                ...r,
                recommend_by_username: r.recommend_by_username
            })
        }

        res.json({
            followers,
            followings,
            views_count,
            favourites:user,
            recommendations:recomm
        })
    });
});

//Search followings ,DISTINCT is used to return different values
route.post('/search-followings', async (req,res) => {
    let data = Follow.find({followings:{$all:[new_folloings]}}).limit(10).exec((err,data) => data);
    res.json(data);
});

module.exports = route;



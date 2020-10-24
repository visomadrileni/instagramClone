const route = require('express').Router(),
      User = require('../../../model/User'),
      Follow = require('../../../model/Follow'),
      {catchError} = require('../../../utils/error');

  //Block user
  route.post('/block', async (req,res) => {
      let respObj = {};

      try{
          let {user} = req.body,
          {id} = req.session,
          username = User.findOne({session:{username:user}}),
          isBlocked = User.findById(id,(err,user) => {
                if(user){
                    return user.blockedUsers.map(u => u.username === username)
                }
          }),
          blocked = {
              block_by: id,
              user,
              block_time: new Date().getTime()
          };

          if(!isBlocked){
               User.update({blockedUsers:blocked});
               Follow.findOneAndRemove({followers:{follow_by:user,follow_to:id}});
               respObj = {
                  message: `Blocked ${username}`
              };
          }else{
              respObj = {
                  message: `Already blocked ${username}`
              };
          }
      }catch(error){
          console.log(error);
          respObj = { message: 'An error occured'}
      }
      res.json(respObj);
  });

//Unblock user
route.post('/unblock-user', async (req,res) => {
    try{
        User.findOneAndRemove({blockedUsers:req.body.block_id});
        res.json({success: true })
    }catch(error){
        catchError(error,res);
    }
});

//Get blocked users
route.post('/get-blocked-users', async (req,res) => {
     const {id} = req.session;
     User.find({session:{id},$all: blockedUsers},(err,u) => {
        let blockedUsers=[]; 
        for(let b of u.blockedUsers){
            blockedUsers.push({
                ...b,
                mutualFollowersCount: u.mutualFollowers.length
            });
        }
    
        res.json(blockedUsers);
    })
    blockedUsers = [];
});

module.exports = route;





























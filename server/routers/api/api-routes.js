const route = require('express').Router(),
      User = require('../../model/User'),
      Group = require('../../model/Group'),
      Hashtag = require('../../model/Hashtag');

 //For checking if its valid user [req=username]
 route.post('/is-user-valid', async (req,res) => {
     const {username} = req.body;
     let isValid = User.findOne({session:{username:username}}).exec((err,res) =>{
         if(res.length === 1){
             return true;
         }else{
             return false;
         }
     });
     res.json(isValid);
 });

 //Gettings users details [req=username]
 route.post('/get-users-details', async (req,res) => {
     const {username} = req.body;
     const user = User.findOne({session:{username:username}});
     res.json({
        details: {
             ...user,
             isOnline: user.isOnline    
           },
        tags:user.tags
    })
 });

 //GETTING MUTUAL USERS [req=username]
 route.post('/get-mutual-users', async (req,res) => {
     const {id} = req.session;
     let mutuals = User.findById({session:{id:id}}).exec((err,user) => {
         return user.mutualUsers;
     })
     res.json(mutuals.slice(0,10));
 });

 //Search instagram [req=value]
 route,post('/search-instagram', async (req,res) => {
     const {value} = req.body,
           {id} = req.session;
           User.find({newUser:{username:value,id:id}}).limit(7).exec((err,users) => {
                        let users = [];
                        for(let u of users){
                            users.push({
                                ...u,
                                mutualFollowersCount: u.mutualFollowers.length
                            })
                        }

                  Group.find({group_details:{name:value}}).limit(7).sort({group_details:{group_id:-1}}).exec((err,groups) =>{
                      let groups = [];
                      for(let g of groups){              
                        groups.push({
                            ...g,
                            membersCount:g.members.length,
                            mutualMembersCount: g.mutualMembers.length
                        })
                       }
                  })

                 let hashtags = Hashtag.find({userHashtags:value}).limit(10).sort({hashtag_time:-1}).exec((err,hashtags) => {
                     return hashtags;
                 })

          res.json({users,groups,hashtags})  
        });
 });

 module.exports = route;



























































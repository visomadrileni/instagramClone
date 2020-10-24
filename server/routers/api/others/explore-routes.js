const route = require('express').Router();
const  _ = require('lodash');
const Follow = require('../../../model/Follow');
const User = require('../../../model/User');
const Post = require('../../../model/Post');
const Group = require('../../../model/Group');


 //Users to explore
 route.post('/get-users-to-explore', async (req,res) => {
     const {id} = req.session;
     User.find({session:{id}}).limit(12).exec((err,_users) => {
        let users = [];
        for(let u of _users){
            let isFollowing = Follow.findOne({followers:{follow_by:id,follow_to:u.id}}).exec((err,res) => {
                if(res.length === 1){
                    return true;
                 }else{
                    return false;
                }
            });
            let followers_count = Follow.find({followers:{follow_to:u.id}}).exec((err,res) => { return res.length; });
            let mutualUsers = User.findOne({mutualUsers:{id:u.id}});
   
            !isFollowing ? users.push({
                ...u,
                followers_count,
                mutualUsersCount: mutualUsers.length
            }) : []
        }
   
        let orderByMutualUsers = _.orderBy(users,['mutualUsersCount'],['desc']);
        res.json(orderByMutualUsers);
     })
 });

 //Photos to explore
 route.post('/get-photos-to-explore', async (req,res) => {
     const {id} = req.session;
     User.findById(id,(err,user) => {
          if(user){
            res.json(user.toPosts.photos);
          }
     })
 });

 //Groups to explore
 route.post('/get-groups-to-explore', async (req,res) => {
     Group.find({},(err,_groups) => {
        let groups = [];
        for(let g of _groups){
            let membersCount = Group.find({group_details:{group_id:g.group_id}}).exec((err,members) => members.length);
   
            !g.joined ? groups.push({
                ...g,
                membersCount,
                mutualMembersCount: g.mutualMembers.length,
                joined:g.joined
            }) : []
        }
   
        let orderByMutualUsers = _.orderBy(groups,['mutualMembersCount'],['desc']);
        res.json(orderByMutualUsers);
     })
 });

 //Get suggested users [req=user]
 route.post('/get-suggested-users', async (req,res) => {
   const {id} = req.session;

    User.findById({session:{id}},(err,user) => {
        let users = [];
              if(user){
                  user.toFollow.followers.map(f => {
                    User.find({}).linit(10).exec((err,_users) => {
                        for(let u of _users){
                            !u.id === f.id ? users.push({
                                ...u,
                                mutualUsersCount: f.mutualUsers.length
                            }) : null
                        }
                  })
              })

         let filter = user ? users.filter(u => u.username !== user) : users;
         let orderByMutualUsers = _.orderBy(filter.slice(0,5),['mutualUsersCount'],['desc']);
         res.json(orderByMutualUsers);
     }
   })
 });

module.exports = route;










































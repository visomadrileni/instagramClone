const route = require('express').Router(),
      Group = require('../../../model/Group'),
      User = require('../../../model/User'),
      root = process.cwd(),
      {promisify} = require('util'),
      {createReadStream,createWriteStream,mkdir} = require('fs'),
      {catchError} = require('../../../utils/error'),
      {check,validationResult} = require('express-validator');

  //Create group [req=name,bio]
 route.post('/create-group',[check('name','Name is empty!!').notEmpty(),
 check('name','Name must be less than 255 characters').isLength({ max: 255})],async (req,res) => {
     let {name,bio} = req.body,
     {id} = req.session;

     let errors = await validationResult(req);
     if(!errors.isEmpty()){
         let array = [];
         errors.array().forEach(e => array.push(e.msg));
         res.json({ msg: array})
     }else{
         let group = {name,bio,admin:id,created: new Date().getTime()};
         Group.update({group_details:group},{oldEnough:true},{upsert:true},(err,groupUpdated) => {
            const {group_id} = groupUpdated;
            makeDir = promisify(mkdir);

            if(groupUpdated.nModified === 1){
                makeDir(`${root}/dist/groups/${group_id}`);
                createReadStream(`${root}/dist/images/wheel.jpg`).pipe(createWriteStream(`${root}/dist/groups/${group_id}/avatar.jpg`));               
                Group.create({group_id: group_id,members: id,admin: id,joined: new Date().getTime()}).save();
                res.json({
                   success: true,
                   message: 'Group created successfully',
                   groupId: group_id
               })
            }else{
                res.json({
                    message: 'Error in creating group'
                })
            }
         });
     }
 });

 //Edit group [req=name,bio,group_type,group]
 route.post('/edit-group', async (req,res) => {
     try{
         const {name,bio,group_type,group} = req.body;
         Group.update({group_details:{group_id:group,name,bio,group_type}});
         res.json({
             success: true,
             message: 'Updated'
         })
     }catch(error){
         catchError(error,res)
     }
 });

 //Check if group is valid [req=group_id]
 route.post('/is-group-valid', async (req,res) => {
    Group.find({group_details:{group_id:req.body.group_id}}).limit(1).exec((err,groupCount) => {
         return groupCount.length === 1 ? true : false
     });
 });

 //Get group details [req=group_id]
 route.post('/get-group-details', async (req,res) => {
   const {group_id} = req.body;
   Group.find({group_details:{group_id,admin:req.session.id}}).exec((err,res) => {
       const {_details,postsCount} = res;
        res.json({
            ..._details,
            postsCount
        })
   })
 });

 //Joined group or not [req=body]
 route.post('/joined-group', async (req,res) => {
     Group.findOne(req.body.group,(err,group) => {
          if(group){
              res.json(group.joined)
          }
     });
 })

 //Join group [req=user,added_by,group_when]
  route.post('/join-group', async (req,res) => {
      let respObj = {};
      
      try{
          const {user,added_by,group,when} = req.body,
                {id: session} = req.session;
          User.findOne({username:user},(err,usr) => {
               Group.find({group_details:{group_id:group}},(err,grp) => {
                   if(!grp.joined){
                       grp.create({
                            group_details: {
                                group_id: group,
                                added_by,
                                joined_group: new Date().getTime()
                            },
                            member: usr,
                       }).save();

                       respObj = {
                                success: true,
                                message: `${when === 'add_group_member' ? `Added ${usr}` : 'Joined'}`
                            };
                   }else{
                    respObj = {message: `${session === user ? 'You' : usr} already joined the group !!!` }
                   }
               })
               res.json(respObj);
          })
      }catch(error){
          console.log(error);
          respObj = { message: 'An error occurred'}
      }
  });

  //Leave group [req=user,group]
  route.post('/leave-group', async (req,res) => {
    try{
      const {user,group} = req.body;
      Group.findOneAndRemove({group_members:{group_id:group},members:{member:user}});
      res.json({
          success: true,
          message: `Left ${group}`
      });
    }catch(error){
        catchError(error,res)
    }
  });

 //Remove member [req=member,group_id]
 route.post('/remove-group-member', async (req,res) => {
     const {member,group_id} = req.body;
     Group.findOneAndRemove({group_members:{group_id},members:{member}});
     res.json({ message: `This member ${member} is not part of the group`})
 });

 //Get mutuals group members [req=group_id]
 route.post('/get-mutuals-newest-members' , async (req,res) => {
     const {group_id} = req.body;
     Group.find({group_members:{group_id}},(err,groupMembers) => {
        res.json({
            mutualsMembers: groupMembers.mutualsMembers,
            newestMembers:  groupMembers.slice(0,10)
        });
     });
 });

 //Get users to invite
 route.post('/get-users-to-invite', async (req,res) => {
     let users = Group.find({usersToInvite: {follow_by:req.session.id}}).sort({usersToInvite:{follow_time:-1}});
     res.json(users);
 })

//Change admin [req=user,group]
route.post('/change-admin' ,async (req,res) => {
    try{
        const {user,group} = req.body;
        User.findOne({user_details:{username:user}},(err,username) => {
           if(username){
            Group.update({group_details: {admin:user,group_id:group}});
            res.json({
                success: true,
                message: `${username} is now admin of this group`
            });
           }
        });
    }catch(error){
        catchError(error,res);
    }
});

//Get users to make admin [req=group_id]
 route.post('/get-users-to-make-admin' ,async (req,res) => {
     Group.find({group_details: {group_id:req.body.group_id},members:{member:req.session.id}},(err,members) => {
         if(err){
             console.log('No user found to made it as admin')
         }
         if(members){
            res.json(members)
         }
     });
 });

 //Delete group [req=group]
 route.post('/delete-group', async (req,res) => {
     Group.findByIdAndRemove({group_details: {group_id:req.body.group}});
     res.json({ message: `You delete this group ${req.body.group}` })
 })

 module.exports = route;



















































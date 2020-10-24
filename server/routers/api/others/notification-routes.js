const route = require('express').Router();
const User = require('../../../model/User');
const Follow = require('../../../model/Follow');
const Notification = require('../../../model/Notification');


//Notifies the specified user [req=to,type,post_id,group_id,post]
route.post('/notify', async (req,res) => {
    const {to,type,post_id,group_id,user} = req.body;
     Notification.create({notifications:{
        notify_by: req.session.id,
        notify_to: to,
        type,
        notify_time: new Date().getTime(),
        post_id,
        group_id,
        user
    }}).save();
    res.json({ message: `${user} is notified` })
});

//Returns users notifications
route.post('/get-notifications', async (req,res) => {
    const {id} = req.session;
    Notification.find({notifications:{notify_to:id,notify_by:users.id}}).sort({notifications:{notify_time:-1}}).exec((err,notifications) => {
        let array = [];

        for(let n of notifications){
            let isFollowing = Follow.findOne({followers:{follow_by:id,follow_to:n.notify_by}}).exec((err,res) => {
                if(res.length === 1){
                    return true;
                }else{
                    return false
                }
            });
            let user_username = n.user !== 0 ? User.findOne({session:{username:n.user}}) : ''
    
            array.push({
                ...n,
                isFollowing,
                user_username
            })
        }
    
        res.json(array)
    })
});

//Clear all the notifications
 route.post('/clear-notifications' , async (req,res) => {
     Notification.findByIdAndRemove({notifications:{notify_to:req.session.id}});
     req.json('You just deleted')
 });

 
//Returns the count of user`s unread notifications
route.post('/get-unread-notifications', async (req,res) => {
     Notification.find({notifications:{notify_to:req.session.id,status:'unread'}}).exec((err,notif) => {
        res.json(notif.length);
    });
});

//Makes unread notifications of a user as read notification
route.post('/read-notifications', async (req,res) => {
    Notification.update({notifications:{notify_to:req.session.id,status:'read'}});
    res.json('This notification is readed')
});

module.exports = route;


























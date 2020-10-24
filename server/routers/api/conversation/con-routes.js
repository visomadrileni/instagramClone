const route = require('express').Router();
const User = require('../../../model/User');
const Follow = require('../../../model/Follow');
const Message = require('../../../model/Message');
const root = process.cwd();
const {orderBy} = require('lodash');
const {catchError} = require('../../../utils/error');

//Create a Conversation [req=user]
route.post('/create-new-conversation',async (req,res) => {
    let respObj = {};
    try{
        const {id} = req.session,
              {user:username} = req.body;
        User.findById(id, (err,myProfile) => {
                if(myProfile){
                    myProfile.find({followers: username}, (err,friend) => {
                        const {conExists} = friend;
                        if(conExists === 0){
                            let conversation = new Message.create({conversations:{conversation:{
                                user_one: id,
                                user_two: user,
                                con_time: new Date().getTime()
                            }}})

                            conversation.save();
                            respObj = {
                                success: true,
                                message: `Conversation with ${username} created`,
                                con_id: conversation._id
                            }
                        } else {
                            respObj = {
                                message: `Conversation with  ${username} already exists`
                            }
                        }  
                    })
                }               
           })

        res.json(respObj);
    }catch(error){
        console.log(error);
        respObj = {
            message: 'An error has occurred'
        }
    }
});

//Get conversation of the session user
route.post('/get-conversations', async (req,res) => {
    const {id} = req.session;
    let cons = [];

    Message.findOne({conversation:{conversation:id}}, (err,_cons) => {
          _cons.map(c => {
            let con_with = c.user_one === id ? c.user_two : c.user_one;
            let {username,firstname,surname} = cons_with;
            let cons_with = User.findOne({user_details:{username:con_with}});

            cons.push({
                con_id: c.con_id,
                con_with,
                con_with_username:username,
                con_with_firstname: firstname,
                con_with_surname: surname,
                unreadMessages: c.message.unreadMessages,
                lastMessage: {
                        lastMessageTime,
                        lastMessage: lastMessage ? lastMessage.message : '',
                        lastMessageType: lastMessage ? lastMessage.type : '',
                        lastMessageBy: lastMessage ? lastMessage.message_by : ''
                }
            });
          })

          let orderedCons = orderBy(cons, ['unreadMessages'],['desc']);
          res.json(orderedCons);
     })
});

//Get conversation details [req=con_id]
route.post('/get-conversation-details', async (req,res) => {
    const {id} = req.session,
          {con_id} = req.body;

    try{
        Message.findOne({conversation:{conversation:con_id}},(err,_cons) => {
            _cons.map(c => {
                let con_with = c.user_one === id ? c.user_two : c.user_one;
                let {username,firstname,surname} = cons_with;

                let con = {
                        con_id,
                        con_with,
                        con_with_username:username,
                        con_with_firstname: firstname,
                        con_with_surname: surname,
                        con_time: new Date().getTime(),
                        isOnline: con_with.isOnline === 'yes' ? true : false,
                        lastOnline: con_with.lastOnline
                     }
                
               res.json(con);
            })
         })
    }catch(err){
        console.log(err);
    }
})

//Get conversation messages [req=con_id]
route.post('/get-conversation-messages', async (req,res) => {
      Message.findById({conversation:{conversation:req.body.con_id}},(err,con) => {
        if(con){
            res.json(con.messages);
        }
    });
});

//Unsend all messages [req=con_id]
route.post('/unsend-all-messages', async (req,res) => {
   try{
       const {con_id} = req.body,
             {id} = req.session;
    
      Message.findByIdAndDelete({conversation:{conversation:con_id}},{message_by:id});
      res.json({
          success:true,
          message: 'Deleted all your messages'
      })
    }catch(error){
        catchError(error,res);
    }
});


//Delete Conversation[req=con_id]
route.post('/delete-conversation', async (req,res) => {
    try{
        Message.findByIdAndDelete({conversation:{conversation:req.body.con_id}});
        res.json({
            success: true,
            message: 'Deleted Conversation'
        })
    }catch(error){
       catchError(error,res);
    }
})

//Get conversation about details [req=con_id]
route.post('/get-conversation-about', async (req,res) => {
    const {con_id,user} = req.body;
    let media = [];
         
     User.findById(req.session.id,(err,me) => {
        if(me){
            Message.findById({conversation:{conversation:req.body.con_id}},(err,con) => {
                if(con){
                     let _media = con.find({type:'image'});
                     for(let m of _media){
                        media.push({
                            ...m,
                            message_by_username:m.message_by
                        });
                    }
                    
                    
                res.json({
                    messagesCount:_media.length,
                    media,
                    con_time:con.con_time,
                    mutualFollowersCount: me.mutualFollowers.length
                })  
                }
            });
        }
    });
});

//Get unread messages
route.post('get-unread-messages', async (req,res) => {
    let unreads = Message.find({conDetails:{message_by:req.session.id,status:'unread'}})
    res.json(unreads);
})

//Read messages of a conversation [req=con_id]
route.post('/read-conversation', async (req,res) => {
     Message.findOneAndUpdate({conversation:{conversation:req.body.con_id}},{conDetails:{message_by:req.session.id,status:'read'}}); 
    res.json('Read all new messages')
});

//Get online users 
route.post('/get-online-users', async (req,res) => {
    const {id} = req.session;
    let onlineUsers = [];

    User.findById(id,(err,user) => {
        if(user){
            Follow.find({followers:{follow_by:id,isOnline:"yes"}},(_onlineUsers) => {
                _onlineUsers.map(u => {
                   return onlineUsers.push({
                        ...u,
                        mutualUsersCount: user.mutualFollowers.length
                    })
                })
            })
        }
    })

    res.json(onlineUsers)
});

module.exports = route;
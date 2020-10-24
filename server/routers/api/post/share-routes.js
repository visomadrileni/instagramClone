 const route = require('express').Router(),
       Follow = require('../../../model/Follow'),
       Post = require('../../..//model/Post'),
       User = require('../../../model/User'),
       {catchError} = require('../../../utils/error');

 //Get users to share [req=post]
 route.post('/get-users-to-share', async (req,res) => {
     const {id} = req.session,
           {post} = req.body;
       Follow.find({followings:{follow_by:id}},(err,followings) => {
           let share = [];
           for(let f of followings){
            let didIShare = Post.find({posts:{post:{
                              post_id:post,
                              shared:{  
                                      share_by:id,
                                      share_to:f.follow_to
                                    }}}}).exec((err,res) => {
                                        if(res.length === 1){
                                            return true;
                                        }else{
                                            return false;
                                        }
                                    })

            share.push({...f,didIShare})
          }
 
        res.json(share);
       })
 });

 //Share post [req=post,share_to]
 route.post('/share-post', async (req,res) => {
    let respObj = {};

    try{
        const {share_to,post_id} = req.body,
              {id} = req.session;
        let username = User.findOne({session:{username:share_to}});
        let didIShare = Post.find({posts:{post:{
              post_id:post_id,shared:{share_by:id,share_to:share_to}}}}).exec((err,res) => {
                      if(res.length === 1){
                          return true;
                      }else{
                          return false;
                      }
                  })

        if(!didIShare){
            Post.create({posts:{post:{
                post_id:post_id,
                shared:{  
                        share_by:id,
                        share_to:share_to,
                        share_time: new Date().getTime()
                }}}}).save();

            respObj = {
                success: true,
                message: `Shared to ${username}`
            }
        }else{
            respObj = {
                message: 'Already shared'
            }
        }
    }catch(error){
        console.log(error);
        respObj = {
            message: 'An error occured'
        }
    }
    res.json(respObj);
 });

 //Unshare post [req=post,unshare_to]
  route.post('/unshare_post', async (req,res) => {
      try{
          const {post_id,unshare_to} = req.body,
                {id} = req.session;
          let unshare_to_username = User.findOne({session:{username:unshare_to}});

          Post.findOneAndRemove({posts:{post:{post_id:post_id}}},{posts:{post:{shared:{share_by:id,share_to:unshare_to}}}});
          res.json({
              success: true,
              message: `Unshared to ${unshare_to_username}`
          })
      }catch(error){
          catchError(error,res);
      }
  });

 //Remove share [req=share_id]
 route.post('/remove-share', async (req,res) => {
     const {post} = req.body;
     Post.findOneAndRemove({posts:{post:{shares:{post_id:post}}}})
     res.json(`You removed this shared post ${post}`)
 });

 module.exports = route;
























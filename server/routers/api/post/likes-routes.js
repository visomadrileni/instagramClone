const route = require('express').Router(),
      Post = require('../../../model/Post'),
      Follow = require('../../../model/Follow'),
      {catchError} = require('../../../utils/error');

 //Post liked or not [req=post]
 route.post('/liked-or-not', async (req,res) => {
     let liked = Post.findOne({posts:{post:req.body.post}},(err,post) => {
         if(post){
             if(post.likes.liked_by === req.session.id){
                 return true;
             }else{
                 return false;
             }
         }
     });
     res.json(liked);
 });

 //Like post [req=post]
  route.post('/like-post', async (req,res) => {
      try{
          const {post} = req.body,
                {id} = req.session;
          let liked = Post.findOne({posts:{post:post}},(err,post) => {
            if(post){
                if(post.likes.liked_by === id){
                    return true;
                }else{
                    return false;
                }
            }
        });


          if(!liked){
              Post.create({posts:{post:{
                  post_id:post,
                  likes:{
                      liked_by:id,
                      like_time:new Date().getTime()
                    }
              }}}).save();
           }

          res.json({success: true})
      }catch(error){
          catchError(error,res)
      }
  });

 //Unlike post [req=post]
  route.post('/unlike-post', async (req,res) => {
      try{
           Post.findOne({posts:{post:{post_id:req.body.post_id}}},(err,post) => {
              if(post){
                  Post.findOneAndRemove({posts:{post:{likes:{liked_by:req.session.id}}}}) 
              }
          });
          res.json({success:true})
      }catch(error){
          catchError(error,res);
      }
  });

 //Remove like [req=like_id]
 route.post('/remove-like', async (req,res) => {
     const {like_id} = req.body;
     Post.findOneAndRemove({posts:{post:{likes:{like_id:like_id}}}}) 
     res.json(like_id);
 });

 //Bookmarked or not [req=post]
 route.post('/bookmarked-or-not', async (req,res) => {
     let bookmarked = Post.find({posts:{post:{post_id:req.body.post,bookmarks:{bookmark_by:req.session.id}}}},(err,bookmarked) => {
         if(bookmarked.length === 1){
             return true;
          }else{
             return false;
         }
     });
     res.json(bookmarked);
 });

 //Bookmarked post [req=post]
 route.post('/bookmarked-post', async (req,res) => {
     try{
         const {post_id} = req.body,
               {id} = req.session;
         let bookmarked = Post.find({posts:{post:{post_id:post_id,bookmarks:{bookmark_by:id}}}},(err,bookmarked) => {
            if(bookmarked.length === 1){
                return true;
             }else{
                return false;
             }
         });

         if(!bookmarked){
             Post.create({posts:{post:{
                      post_id:post_id,
                      bookmarks:{
                        bookmark_by: id,
                        bookmark_time: new Date().getTime()
                      }
                }}}).save();
         }
        res.json({
            success: true,
            message: 'Post bookmarked'
        }); 
     }catch(error){
         catchError(error,res)
     }
 });


 //Unbookmarked post [req=post,user]
 route.post('/unbookmark-post', async (req,res) => {
     try{
         const {post,user} = req.body;
         Post.findOneAndRemove({posts:{post:{post_id:post,bookmarks:{bookmark_by:user}}}});
         res.json({success: true})
     }catch(error){
         catchError(error,res);
     }
 });

  //Get post likes [req=post]
  route.post('/get-post-likes', async (req,res) => {
      const {post} = req.body;
      Post.findOne({posts:{post:{post_id:post}}},(err,post) =>{
           let likes = [];
           if(post){
            for(let l of post.likes){
                likes.unshift({
                    ...l,
                    isFollowing: Follow.findOne({followers:{follow_by:l.liked_by}}).exec((err,res) =>{
                        if(res.length === 1){
                            return true;
                        }else{
                            return false;
                        }
                    })
                })
              }

              res.json({
                likes: likes,
                isPostMine: post.isPostMine
            });
      }}) 
  });

  module.exports = route;


























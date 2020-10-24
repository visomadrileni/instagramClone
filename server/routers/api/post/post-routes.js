
 const route = require('express').Router(),
       Post = require('../../../model/Post'),
       User = require('../../../model/User'),
       Follow = require('../../../model/Follow'),
       root = process.cwd(),
       upload = require('multer')({  dest: `${root}/dist/temp/` }),
      {ProcessImage,DeleteAllOfFolder} = require('../../../utils/handyImageProcessor'),
      {catchError} = require('../../../utils/error');

 //Post [req=desc,filter, location,type,group,image(file)]
  route.post('/post-it',upload.single('image'),async (req,res) => {
    try{
     const {desc,filter,location,type,group} = req.body;   
     const {id} = req.session;
     let filename = `instagram_account_${new Date().getTime()}.jpg`,
         obj = {
            srcFile: req.file.path,
            destFile: `${root}/dist/posts/${filename}`
           };

       ProcessImage(obj);
       DeleteAllOfFolder(`${root}/dist/temp/`);

       let newPost = Post.create({posts:{post:{postIt:{
               user:id,
               fileInput:filename,
               desc,
               filter,
               location,
               type,
               group,
               post_time: new Date().getTime() 
           }}}}).save();
        
       User.findById({session:{id:id}},(err,user) =>{
           if(user){
               const {username,surname} = user;
               res.json({
                success: true,
                message: 'Posted',
                post_id: newPost,
                firstname,
                surname,
                filename
            })
           }
       })    
    }catch(error){
        catchError(error,res);
    }
  });

 //Tags users for a post [req=tags,post_id]
 route.post('/tag-post', (req,res) => {
     const {tags,post_id} = req.body;
     tags.forEach(async t => {
           Post.update({posts:{post:{tags:{
                 post_id: post_id,
                 user: t.user
            }}}}).save();
     });
     res.json(null)
 });

 //Edit post [req=post, description]
 route.post('edit-description', async (req,res) => {
     try{
          const {post_id,description} = req.body;
          Post.findOneAndUpdate({posts:{post:{post_id:post_id}}},{posts:{post:{postIt:{$set:{desc:description}}}}});
          Post.findByIdAndRemove({posts:{post:{post_id:post_id}}});

         res.json({
             success: true,
             message: 'Post updated'
         })
     }catch(error){
         catchError(error,res);
     }
 });

  //Get post tags [req=post]
  route.post('/get-post-tags', async (req,res) => {
      const {post} = req.body,
            {id} = req.session;
       User.findById({session:{id:id}},(err,user) => {
          let tags = [];
          for(let t of user.toPosts.tags){
            tags.push({
                ...t,
                isFollowing: Follow.findOne({followers:{follow_by:t.user}}).exec((err,f) => {
                    if(f.length === 1){
                        return true;
                    }else{
                        return false;
                    }
                })
            })
         }
       
        let isPostMine = Post.findOne({posts:{post:{post_id:post}}}).exec((err,p) => {
            if(p.length === 1){
                return true;
            }else{
                return false;
            }
        })

        res.json({tags,isPostMine})     
    })
  });

  //Untag [req=post,user]
  route.post('/untag', async (req,res) => {
      const {user,post} = req.body;
      Post.findOneAndRemove({posts:{post:{tags:{
             post_id:post,
             user:user
      }}}});
      res.json('The post is untag')
  });

  //Delete post [req=post]
  route.delete('/delete-post', async (req,res) => {
      try{
          Post.findOneAndRemove({posts:{post:{post_id:req.body.post}}});
          res.json({
              success: true,
              message: 'Post deleted'
          })
      }catch(error){
          catchError(error,res)
      }
  });

  module.exports = route;







































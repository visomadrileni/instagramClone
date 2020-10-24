const route = require('express').Router(),
      Group = require('../../../model/Group'),
      Post = require('../../../model/Post'),
      User = require('../../../model/User');

 //Get users posts [req=username]
 route.post('/get-users-posts', async (req,res) => {
     User.findOne({session:{username:req.body.username}},(err,user) => {
            if(user){
                let posts = [];
                for(let p of user.toPosts.posts){
                     Post.find({posts:{post:p.post_id}},(err,post) => {
                        if(post){
                            let {tags,likes,shares,comments} = post;
                            posts.push({
                                ...p,
                                tags_count:tags.length,
                                likes_count:likes.length,
                                shares_count:shares.length,
                                comments_count:comments.length
                            })
                        }
                    });
                }
                res.json(posts);
            }
     })
 });

 //Get bookmarked posts [req=user]
 route.post('/get-bookmarked-posts', async (req,res) => {
      Post.find({bookmarks:{bookmarked_by:req.body.user}},(err,_posts) => {
        let posts = [];

        for(let p of _posts){
             Post.find({posts:{post:p.post_id}},(err,post) => {
                if(post){
                    let {tags,likes,shares,comments} = post;
                    let group_name = Group.findOne({group_details:{group_id:p.group_id}});
   
                    posts.push({
                        ...p,
                        tags_count:tags.length,
                        likes_count:likes.length,
                        shares_count:shares.length,
                        comments_count:comments.length,
                        group_name
                    })
                 }
            });
          }
      res.json(posts);
    })
 });

 // Get tagged posts [req=user]
  route.post('/get-tagged-posts', async (req,res) => {
    Post.find({posts:{post:{tagsUser:req.body.user}}},(err,_posts) => {
        let posts = [];

        for(let p of _posts){
             Post.find({posts:{post:p.post_id}},(err,post) => {
                if(post){
                    let {tags,likes,shares,comments} = post;
                    let group_name = Group.findOne({group_details:{group_id:p.group_id}});
   
                    posts.push({
                        ...p,
                        tags_count:tags.length,
                        likes_count:likes.length,
                        shares_count:shares.length,
                        comments_count:comments.length,
                        group_name
                    })
                 }
            });
          }
      res.json(posts);
    })
  });

  //Get post by [req=post_id]
  route.post('/get-post', async (req,res) => {
      const {post_id} = req.body;
      Post.find({posts:{post:post_id}},(err,post) => {
          if(post){
            let {tags,likes,shares,comments} = post;
            let group_name = Group.findOne({group_details:{group_id:p.group_id}});
            let post = {
                ...post[0],
                tags_count:tags.length,
                likes_count:likes.length,
                shares_count:shares.length,
                comments_count:comments.length,
                group_name,
                comments
            };
          }

          res.json(post);
      })
  });

 module.exports = route;


















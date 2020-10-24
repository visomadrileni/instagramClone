
 const route = require('express').Router(),
       User = require('../../../model/User'),
       Post = require('../../../model/Post'),
       Group = require('../../../model/Group'),
       Hashtag = require('../../../model/Hashtag');

 //Get users hashtag [req=username]
 route.post('/get-users-hashtags', async (req,res) => {
    User.findOne({user_details:{username:req.body.username}},(err,user) => {
           if(user){
               res.json(user.toHashtag.userHashtags);
           }
     });
 });

 //Get groups hashtags [req=group_id]
 route.post('/get-groups-hashtags', async (req,res) => {
    Group.findOne({group_details:{group_id:req.body.group_id}},(err,group) => {
        let hashtags = [];
        for(let post of group.toPosts.posts){
                let hash = Hashtag.find({groupHashtags:{post_id:post.post_id}}).sort({hashtag_time:-1});
                    hashtags = [ ...hashtags, ...hash];
              }
        
       res.json(hashtags);
    })
 });

//Get popular hashtags
route.post('/get-popular-hashtags', async (req,res) => {
    let hashtags = Hashtag.find({$all:{popularHashtags}}).limit(10);
    res.json(hashtags);
});

//Get hashtag posts [req=hashtag]
 route.post('/get-hashtags-posts', async (req,res) => {
      Post.find({},(err,_posts) => {
        let posts = [];

        for(let p of _posts){
            let {tags,likes,sharers,comments} = Post.findOne({posts:{post:p.post_id}});
            let group = Group.findOne({group_details:{group_id:p.group_id}});
   
            posts.push({
                ...p,
                tags_count:tags.length,
                likes_count:likes.length,
                shares_count:sharers.length,
                comments_count:comments.length,
                group_name: group.name
            })
        }
   
        res.json(posts);
     });
 });

 module.exports = route;





















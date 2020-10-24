const route = require('express').Router(),
      Group = require('../../../model/Group'),
      User = require('../../../model/User'),
      Post = require('../../../model/Post');

//Get users groups [req=user]
route.post('/get-user-groups', async (req,res) => {
    Group.find({},(err,_groups) => {
        let groups = [];
        for(let g of _groups){
            let joined = Group.findOneAndUpdate({group_details:{group_id:g.group_id}},{members:{member:req.session.id}},{upsert:true});
            groups.push({...g,joined});
        }
    
      res.json(groups);
    })
});

//Get group posts [req=group]
route.post('/get-group-posts', async (req,res) => {
     Post.find({},(err,_posts) => {
        let posts = [];

        for(let p of _posts){
            let {tags_count,likes_count,shares_count,comments_count} = p.post_id;
            posts.push({
                ...p,
                tags_count,
                likes_count,
                shares_count,
                comments_count
            })
        }
    
        res.json(posts)
    });
});

//Get groups photos [req=group]
route.post('/get-group-photos', async (req,res) => {
    let photos = Post.find({posts:{group_id:req.body.group}}).sort({posts:{post_time: -1}});
    res.json(photos);
})

//Get group members [req=group_id]
route.post('/get-group-members', async (req,res) => {
    const {group_id} = req.body;
    
    Group.find({group_members:{group_id},member:{}}).sort({group_members:{joined_group: -1}}).exec((err,_members) => {
        for(let m of _members){
             let members = [];
             User.findOne({username:m.added_by},(err,user) => {
                let {added_by_username,mutualUsers} = user;
                members.push({
                    ...m,
                    added_by_username,
                    mutualUsersCount: mutualUsers.length
                });
             })
        }
        res.json(members);
    })
});

module.exports = route;




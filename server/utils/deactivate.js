const util = require('util');
const {rmdir} = require('fs');
const User = require('../model/User');
const Post = require('../model/Post');
const Group = require('../model/Group');
const Follow = require('../model/Follow')
const Message = require('../model/Message');
const Hashtag = require('../model/Hashtag');

 const deactivate = async (user,req,res) => {
    await User.find({user_details:{username:user}},(err,user) => {
        if(user){
            //Delete all Posts
            user.toPosts.posts.map(async p => {
                await Post.findOneAndRemove({posts:{post:p.post_id}})
                await Post.findOneAndRemove({posts:{tags:{user:user}}})
            });

            Group.findOne({group_details:{admin:user}},(err,groups) => {
                //Delete all Groups
                groups.map(async g => {
                    await Group.findOneAndRemove({group_details:{group_id:g.group_id}});
                });
            })

            Message.findOne({conversations:{user_one:user,user_two:user}},(err,convs) => {
                convs.map(c => {
                    Message.findOneAndRemove({conversations:{conversation:c.con_id}})
                })
            })

             Hashtag.findOneAndRemove({hashtags:{user:user}});
             Follow.findOneAndRemove({followers:{$or:[{follow_by:user,follow_to:user}]}})
             Follow.findOneAndRemove({favorites:{$or:[{fav_by:user,user:user}]}});
             Follow.findOneAndRemove({recommendations:{$or:[{recommend_by:user,recommend_to:user,recommend_of:user}]}});
             Notification.findOneAndRemove({notifications:{$or:[{notify_by:user,notify_to:user,user:user}]}});

            let dltDir = util.promisify(rmdir);
            let cookieUsers = JSON.parse(req.cookies.users);
            let filtered = cookieUsers.filter(u => u.id !== user);
    
            DeleteAllOfFolder(`${root}/dist/users/${user}/`);
             dltDir(`${root}/dist/users/${user}`);
             user.findOneAndRemove({user_details:{id:user}});
        
            //Sets cookie name to value. The value parameter may be a string or object converted to JSON.
            res.cookie('users',`${JSON.stringify(filtered)}`);
            req.session.reset();
        }
    });
}

module.exports = deactivate;
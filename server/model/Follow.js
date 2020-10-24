const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FollowSchema = new Schema({
    isFollowing: {
        type:Boolean,
        default: false
    },
    followers:[{
        follow_by_username: {
            type: String
           },
        follow_by:{
            type: String
          },
        follow_to:{
           type: String
        },  
        follow_id:{
            type: String
        },
        firstname:{
            type: String
         },
        surname:{
            type: String
         },
        follow_time:{
            type:Date
        }
    }],
    followings:[{
        follow_by:  {
            type: String
           },
        follow_by_username:  {
            type: String
           },
        follow_to:  {
            type: String
           },
        follow_to_username:  {
            type: String
           },
        follow_time:{
            type: Date
        },
        new_followings:{
            type:Array
        }
    }],
    profile_views: {
        view_by: {
            type:String
        },
        view_to: {
            type:String
        },
        view_time: {
            type: Date
        }
    },
    favourites: {
        type: Array
    },
    usersToRecommend: {
        type: Array
    },
    recommendations: {
        type: Array
    }
});

module.exports = mongoose.model('Follow',FollowSchema);
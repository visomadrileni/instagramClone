const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
    group_details: {
        group_id: {
            type:String,
            required: true
        },
        name: {
            type:String,
            required: true
        },
        bio: {
            type:String,
            required: true
        },
        admin: {
            type:String,
            required: true
        },
        admin_username: {
            type:String,
            required: true
        },
        created: {
            type:Date,
            timestamp: true
        },
        group_type: {
            type:String,
            required: true
        },
        postsCount: {
            type: Number,
            default: 0
        }
      },
    joined: {
        type: Boolean,
        default: false
    },
    members: {
        type: Array
    },
    mutualMembers:  {
        type: Array
    },
    newestMembers:  {
        type: Array
    },
    userGroups:  {
        type: Array
    },
    usersToInvite:  {
        type: Array
    },
    usersToMakeAdmin:  {
        type: Array
    },
    toPosts: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Post'
     },
});

module.exports = mongoose.model('Group',GroupSchema);
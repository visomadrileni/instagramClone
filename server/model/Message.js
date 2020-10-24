const mongoose =  require('mongoose');
const Schema =  mongoose.Schema;

const MessageSchema = new Schema({
    conversations: {
        type: Array,
        required:true
    },
    messages: {
        type: Array,
        required: true
    },
    conAbout: {
        type: Array,
        required: true
    },
    unreadMessages: {
        type:Number,
        default: 0
    },
    onlineUsers: {
        type: Array,
        required: true
    },
    conDetails: {
        con_with: {
            type:String
        },
        con_with_username: {
            type:String
        },
        con_with_firstname: {
            type:String
        },
        con_with_surname: {
            type:String
        },
        isOnline: {
            type: String,
            enum: ['no','yes'],
            default: 'no'
        },
        lastOnline: {
            type: Date,
            default: Date.now
        },
        status:{
            type:String,
            default: 'unread'
        }
    }
})

module.exports = mongoose.model('Message',MessageSchema);
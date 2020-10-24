const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    posts:{
        post: [{
            comments: {
                type: Array,
                required:true
                },
            bookmarks: {
                type: Array,
                required:true
               },
            tagged:{
                type: Array,
                required:true
               },
            shared:{
                type: Array,
                required:true
               },
            photos:{
                type: Array,
                required:true
              },
            feed:{
                type: Array,
                required:true
              },
            viewPost:{
                type: Array,
                required:true
               },
            likes:{
                type: Array,
                required:true
               },
            tags:{
                type: Array,
                required:true
               },
            posted:{
                type:Boolean,
                default: false
               },
            isPostMine:{
                type:Boolean,
                default:false
               },
            usersToShare:{
                type: Array,
                required:true
               },
            sharers: {
                type: Array,
                required:true
               },
            postIt:{
                user:{
                    type:String,
                    required:true,
                    unique:true
                },
                fileInput: {
                    type:String,
                    default: ''
                },
                fileChanged: {
                    type:Boolean,
                    default: false
                },
                targetFile: {
                    type:String,
                    default: ''
                },
                previewImg: {
                    type: String,
                    default: '/img/location.jpg'
                },
                desc: {
                    type:String,
                    default: ''
                },
                filter: {
                    type: String,
                    default: 'filter-normal'
                },
                fetchingLocation: {
                    type: Boolean,
                    default: false
                },
                location: {
                    type: String,
                    default: ''
                },
                post_time:{
                    type: Date,
                    default: Date.now
                },
                addTag: {
                    type: Boolean,
                    default: false
                },
                tags: {
                    type: Array
                },
                showOverlay: {
                    type: Boolean,
                    default: false
                },
                type: {
                    type:String
                },
                group: {
                    type: String
                }
            }   
        }]
    }                      
});

module.exports = mongoose.model('Post',PostSchema);
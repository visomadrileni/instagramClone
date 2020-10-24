const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HashtagSchema = new Schema({
    userHashtags: {
        type: Array
    },
    groupHashtags:  {
        type: Array
    },
    popularHashtags:  {
        type: Array
    },
    hashtagPosts:  {
        type: Array
    }
});

module.exports = mongoose.model('Hashtag',HashtagSchema);

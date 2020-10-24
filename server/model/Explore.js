const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const ExploreSchema = new Schema({
    users: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    photos: {
        type: Array
    },
    groups:  {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Groups'
    },
    suggested: {
        type: Array
    }
});

module.exports = mongoose.model('Explore',ExploreSchema);
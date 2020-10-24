const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    notifications: {
        type: Array
    },
    unreadNotifications: {
        type: Number,
        default:0
    }
});

module.exports = mongoose.model('Notification',NotificationSchema);
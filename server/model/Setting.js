const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SettingSchema = new Schema({
    blockedUsers: {type: Array}
});

module.exports = mongoose.model('Setting',SettingSchema);
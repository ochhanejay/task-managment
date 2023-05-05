const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({

}, { strict: false, timestamps: true, });
var userModel = mongoose.model('userList', userSchema);
module.exports = userModel;
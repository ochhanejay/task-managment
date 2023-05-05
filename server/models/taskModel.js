const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const taskSchema = new Schema({
    User: { type: Schema.Types.ObjectId, required: true }
}, { strict: false, timestamps: true });
var taskModel = mongoose.model('taskList', taskSchema);
module.exports = taskModel;
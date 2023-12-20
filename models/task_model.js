const mongoose = require('mongoose');



const taskSchema = new mongoose.Schema({
    taskID:{type:String, unique:true, required:true},
    task_name:{type:String, required:true},
    task_status:{type:Boolean,default:false},
    task_desc:{type:String, required:true},
    task_start_date:{type:Date},
    task_end_date:{type:Date},
})






// -------------- create table or compilling schema --------
const taskModel = mongoose.model('task', taskSchema);

// -------------- module export ---------------
    module.exports = taskModel;
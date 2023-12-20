const mongoose = require('mongoose');

// ----------------define a schema project------------------
    const projectSchema = new mongoose.Schema({
        EmpID:{type: String},
        leave_type:{type: String},
        leave_desc: {type:String,required:true,trim:true},
        leave_status: {type:Boolean, default:true},
        leave_start_date :{type:Date},
        leave_end_date :{type:Date},
        leave_request_created_at:{type:Date},
        leave_request_updated_at:{type:Date},

    });

// create table or collection in DB
    const leave = mongoose.model('leave', leaveSchema);

// export model
    module.exports = leaveModel;
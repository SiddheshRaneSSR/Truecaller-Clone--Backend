// ------------- craete timesheet model ----------------
    const mongoose = require('mongoose');

// ------------- create time sheet schema -------------
    const timeSheetSchema = new mongoose.Schema({
        EmpID: {type: String,required: true,unique: true},
        project_name : {type:String,trim:true,required:true},
        task_name : {type:String,trim:true,required:true},
        taskID : {type:String,required:true},
        completion:  {type:Boolean,default:false},
        date : {type:Date, default:Date.now},
        task_date : {type:String,required:true},
        logIn: {type:Date},
        logOut:{type:Date}
    });

// -------------- create table or compilling schema --------
    const timesheetModel = mongoose.model('timesheet', timeSheetSchema);

// -------------- module export ---------------
    module.exports = timesheetModel;
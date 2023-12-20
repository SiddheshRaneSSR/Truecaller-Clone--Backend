    const mongoose = require('mongoose');

// ----------------define a schema project------------------
    const projectSchema = new mongoose.Schema({
        project_name: {type:String,required:true,trim:true},
        project_desc: {type:String,required:true,trim:true},
        project_status: {type:Boolean, default:true},
        project_manager: {type:String,required:true,trim:true},
        project_emp : [String],
        project_start_date :{type:Date},
        project_end_date :{type:Date},


    });

// create table or collection in DB
    const ProjectModel = mongoose.model('project', projectSchema);

// export model
    module.exports = ProjectModel;
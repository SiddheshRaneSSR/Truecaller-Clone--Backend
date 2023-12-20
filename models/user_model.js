    const mongoose = require('mongoose');
    
// ----------create user schema ----------

    const userSchema = new mongoose.Schema({
        EmpID: {type: String},
        email : {type:String,required:true,trim:true,lowercase:true,unique: true},
        password: {type:String,required:true,trim:true},    
        position:{type:String,required:true,trim:true},
        user_joining_date:{type:Date,required:true},
        creation_date: {type:Date, default:Date.now()},
        probation_period_tome:{type:String},
        paid_leaves: {type:Number,default:0},
        unpaid_leaves: {type:Number,default:0},
        probation_period_status: {type:Boolean,default:false},
        probation_period_end: {type:Date},
    });

// ----------end schema-------------------

// ----------create table or compilling a schema --------

    const UserModel = mongoose.model('user', userSchema);

// ---------- export model ----------

    module.exports = UserModel;
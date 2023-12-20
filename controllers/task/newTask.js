const schema = require('../../models/task_model');
const session = require('express-session');
const User = require("../../models/user_model")
exports.newTask = async(req,res)=>{


    // Taking values from body
    const { Task_status, Task_Desc, Task_name, Task_start_date, Task_end_date } =  req.body;

    // Create a new task instance
    const newTask = new Task({
        Task_status,
        Task_Desc,
        Task_name,
        Task_start_date,
        Task_end_date,
        EmpID
      });
  
      // Save the new task to the database
      try {
        // Save the new task to the database
        await newTask.save();
  
        // Add taskId to the user's task array
        const user = await User.findOne({ EmpID });
        if (user) {
          user.Task.push(newTask._id);
          await user.save();
        }
  
        res.status(201).json({ message: 'Task created successfully' });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      }

}

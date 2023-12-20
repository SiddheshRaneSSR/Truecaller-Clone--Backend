const schema = require("../../models/task_model");

exports.taskdetails = async (req, res) => {
    try {
        const taskID = req.params.id; // Use req.params to get the task ID from the URL

        const result = await schema.collection('tasks').findOneAndUpdate(
            { _id: new ObjectID(taskID) },
            {
                $set: {
                    Task_status: req.body.Task_status,
                    Task_Desc: req.body.Task_Desc,
                    Task_name: req.body.Task_name,
                    Task_start_date: req.body.Task_start_date,
                    Task_end_date: req.body.Task_end_date,
                },
            },
            { returnDocument: 'after' } // return the updated document
        );

        if (!result.value) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json({ message: 'Task updated successfully', task: result.value });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

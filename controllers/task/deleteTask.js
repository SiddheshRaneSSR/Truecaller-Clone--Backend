const schema = require('../../models/task_model');


exports.deleteTask = async (req, res) => {
    try {
        const taskID = req.params.id;

        const result = await schema.collection('tasks').findOneAndDelete({ _id: new ObjectID(taskID) });

        if (!result.value) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json({ message: 'Task deleted successfully', task: result.value });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

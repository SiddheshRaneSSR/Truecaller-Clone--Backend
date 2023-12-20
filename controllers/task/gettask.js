const schema = require('../../models/task_model');

exports.getTask = async (req, res) => {
    try {
        const { id } = req.params;

        if (id) {
            // Get details about a specific task
            const task = await schema.findById(id);
            if (!task) {
                return res.status(404).json({ error: 'Task not found' });
            }
            return res.json({ task });
        }

        // Get total task status from all projects
        if (req.url === '/GetTask') {
            const tasks = await schema.find();
            return res.json({ tasks });
        }

        // Get statistics on all tasks
        if (req.url === '/GetTask/statistics') {
            const tasks = await schema.find();

            // Initialize statistics
            let totalTasks = 0;
            let completedTasks = 0;
            let remainingTasks = 0;

            // Iterate through tasks to calculate statistics
            tasks.forEach((task) => {
                totalTasks += 1;
                if (task.task_status === 'checked') {
                    completedTasks += 1;
                } else {
                    remainingTasks += 1;
                }
            });

            const task_statistics = {
                totalTasks,
                completedTasks,
                remainingTasks,
                // Add more statistics as needed
            };

            return res.json({ task_statistics });
        }

        // Get statistics on all tasks of an employee
        
        if (req.url === '/GetTask/:EmpID/statistics') {
            const employeeId = req.params.EmpID; 
            const tasks = await schema.find({ EmpID: employeeId }); 

            // Initialize statistics
            let completedTasks = 0;
            let remainingTasks = 0;

            // Iterate through tasks to calculate statistics
            tasks.forEach((task) => {
                if (task.task_status === 'checked') {
                    completedTasks += 1;
                } else {
                    remainingTasks += 1;
                }
            });

            const employeeStatistics = {
                totalTasks: tasks.length,
                completedTasks,
                remainingTasks,
            };

            return res.json({ employeeStatistics });
        }



        // Get deadline for a specific task
        if (req.url === '/GetTask/:id/deadline') {
            const taskDeadline = await schema.findById(id, { Task_end_date: 1 });
            if (!taskDeadline) {
                return res.status(404).json({ error: 'Task not found' });
            }
            return res.json({ deadline: taskDeadline.task_end_date });
        }

        // Get task completion status for a specific task
        if (req.url === '/GetTask/:id/status') {
            const taskStatus = await schema.findById(id, { Task_status: 1 });
            if (!taskStatus) {
                return res.status(404).json({ error: 'Task not found' });
            }
            return res.json({ status: taskStatus.Task_status });
        }

        // If none of the above conditions match, return a 404 error
        res.status(404).json({ error: 'Endpoint not found' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

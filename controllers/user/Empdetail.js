const schema = require("../../models/user_model");

exports.getEmpDetails = async (req, res) => {
    try {
        const empID = req.params.EmpID; // Use req.params to get the employee ID from the URL

        let result;

        if (empID) {
            // Get details about a specific employee
            result = await schema.findOne({ EmpID: empID });
        } else {
            // Get details about all employees
            result = await schema.find();
        }

        if (!result) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        // Include optional parameters based on query parameters
        const updateParams = {};
        if (req.query.statistics) {
            // Handle statistics parameter
            // Your logic here
            updateParams.statistics = req.query.statistics;
        }

        if (req.query.status) {
            // Handle status parameter
            // Your logic here
            updateParams.status = req.query.status;
        }

        // Add more optional parameters as needed

        res.json({ message: 'Employee details fetched successfully', employeeDetails: result, updateParams });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

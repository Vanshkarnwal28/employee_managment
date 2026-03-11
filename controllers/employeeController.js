const Employee = require('../models/Employee');

// @desc    Create new employee
// @route   POST /api/employees
// @access  Public
exports.createEmployee = async (req, res, next) => {
    try {
        const employee = await Employee.create(req.body);
        res.status(201).json({ success: true, data: employee });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc    Get all employees
// @route   GET /api/employees
// @access  Public
exports.getAllEmployees = async (req, res, next) => {
    try {
        const employees = await Employee.find();
        res.status(200).json({ success: true, count: employees.length, data: employees });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Search employees by name or department
// @route   GET /api/employees/search
// @access  Public
exports.searchEmployees = async (req, res, next) => {
    try {
        const { name, department } = req.query;
        let query = {};
        
        if (name) {
            query.fullName = { $regex: name, $options: 'i' };
        }
        if (department) {
            query.department = { $regex: department, $options: 'i' };
        }

        const employees = await Employee.find(query);
        res.status(200).json({ success: true, count: employees.length, data: employees });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Get employee by ID
// @route   GET /api/employees/:id
// @access  Public
exports.getEmployeeById = async (req, res, next) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ success: false, error: `Employee not found with id of ${req.params.id}` });
        }
        res.status(200).json({ success: true, data: employee });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Update employee
// @route   PUT /api/employees/:id
// @access  Public
exports.updateEmployee = async (req, res, next) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!employee) {
            return res.status(404).json({ success: false, error: `Employee not found with id of ${req.params.id}` });
        }

        res.status(200).json({ success: true, data: employee });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Delete employee
// @route   DELETE /api/employees/:id
// @access  Public
exports.deleteEmployee = async (req, res, next) => {
    try {
        const employee = await Employee.findById(req.params.id);
        
        if (!employee) {
            return res.status(404).json({ success: false, error: `Employee not found with id of ${req.params.id}` });
        }

        await employee.deleteOne();
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

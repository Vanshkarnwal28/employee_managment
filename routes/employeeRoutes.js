const express = require('express');
const {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
    searchEmployees
} = require('../controllers/employeeController');

const router = express.Router();

router.route('/search').get(searchEmployees);
router.route('/').get(getAllEmployees).post(createEmployee);
router.route('/:id').get(getEmployeeById).put(updateEmployee).delete(deleteEmployee);

module.exports = router;

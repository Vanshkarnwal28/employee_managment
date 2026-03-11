const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    employeeId: {
        type: String,
        unique: true
    },
    fullName: {
        type: String,
        required: [true, 'Please add a full name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please add a phone number']
    },
    department: {
        type: String,
        required: [true, 'Please add a department']
    },
    designation: {
        type: String,
        required: [true, 'Please add a designation']
    },
    salary: {
        type: Number,
        required: [true, 'Please add a salary'],
        min: [0, 'Salary must be a positive number']
    },
    dateOfJoining: {
        type: Date,
        required: [true, 'Please add a date of joining']
    },
    employmentType: {
        type: String,
        required: [true, 'Please set employment type'],
        enum: ['Full-time', 'Part-time', 'Contract']
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    }
}, {
    timestamps: true
});

// Auto-generate employeeId if not provided
employeeSchema.pre('save', function() {
    if (!this.employeeId) {
        // Simple generation: EMP- followed by timestamp or random number
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        this.employeeId = `EMP-${Date.now().toString().slice(-4)}${randomNum}`;
    }
});

module.exports = mongoose.model('Employee', employeeSchema);

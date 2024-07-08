const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    description: { type: String, required: true },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
    dueDate: { type: Date, required: false },
    status: { type: String, enum: ['To Do', 'Started', 'In Progress', 'Completed'], default: 'To Do' }
});

module.exports = mongoose.model('Task', taskSchema);

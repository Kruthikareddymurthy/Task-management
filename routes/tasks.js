const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create new task
router.post('/', async (req, res) => {
    const task = new Task({
        description: req.body.description,
        priority: req.body.priority,
        dueDate: req.body.dueDate,
        status: req.body.status
    });

    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update Task
router.patch('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (req.body.description) task.description = req.body.description;
        if (req.body.priority) task.priority = req.body.priority;
        if (req.body.dueDate) task.dueDate = req.body.dueDate;
        if (req.body.status) task.status = req.body.status;
        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete Task
router.delete('/:id', async (req, res) => {
    try {
        const result = await Task.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'No task found' });
        }
        res.json({ message: 'Deleted Task' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;//this makes router available to import in other parts of the application

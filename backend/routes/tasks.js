const express = require('express');
const router = express.Router();

const Task = require('../models/task');

router.get('/all-task', async (req, res) => {
    try {
        const tasks = await Task.findAll({
            where: {
                del_flag: 0
            },
        });
        if(tasks.length !== 0) {
            res.json(tasks);
        } else {
            res.json(tasks);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch data' })
    }
});

router.get('/task/:task_id', async (req, res) => {
    const taskId = req.params.task_id;
    try {
        const task = await Task.findAll({
            where: {
                task_id: taskId
            },
        });
        if(task === null) {
            res.json(task);
        } else {
            res.json(task);
        }
    } catch (error) {
        console.error(error);
    }
});

router.post('/new-task', async (req, res) => {
    try {
        const newTask = await Task.create({
            task_name: req.body.task_name,
            task_description: req.body.task_description,
            task_start: req.body.task_start,
            task_end: req.body.task_end,
        });
        res.json(newTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add task' });
    }
});

router.put('/update-task/:task_id', async (req, res) => {
    const taskId = req.params.task_id;
    try {
        const taskUpdated = await Task.update(
            {
                task_name: req.body.task_name,
                task_description: req.body.task_description,
            },
            {
                where: { task_id: taskId },
                returning: true,
            }
        );
        
        if (taskUpdated === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }
        
        res.json({ message: 'Task updated successfuly!' });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update task' });
    }
});

router.delete('/delete-task/:task_id', async (req, res) => {
    const taskId = req.params.task_id;
    try {
        const deletedTask = await Task.destroy({
            where: {task_id: taskId},
            returning: true,
        });

        if(deletedTask === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete task' });
    }
});

//archive a task
router.put('/archive-task/:task_id', async (req, res) => {
    const taskId = req.params.task_id;
    try {
        const taskArchived = await Task.update(
            {
                del_flag: 1,
            },
            {
                where: { task_id: taskId },
                returning: true,
            }
        );
        
        if (taskArchived[0] === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }
        
        res.json({ message: 'Task archived successfuly!' });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to archive task' });
    }
});

//restore archived task
router.put('/restore-task/:task_id', async (req, res) => {
    const taskId = req.params.task_id;
    try {
        const taskRestore = await Task.update(
            {
                del_flag: 0,
            },
            {
                where: { task_id: taskId },
                returning: true,
            }
        );
        
        if (taskRestore[0] === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }
        
        res.json({ message: 'Task restored successfuly!' });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to restore task' });
    }
});

module.exports = router;
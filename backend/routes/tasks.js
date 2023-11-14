const express = require('express');
const router = express.Router();

const Task = require('../models/task');
const Priority = require('../models/priority');

router.get('/all-task', async (req, res) => {
    try {
        const tasks = await Task.findAll({
            where: {
                del_flag: 0
            },
            include: [Priority],
        });

        const flattenedTasks = tasks.map(task => ({
            task_id: task.task_id,
            task_name: task.task_name,
            task_start: task.task_start,
            task_end: task.task_end,
            task_description: task.task_description,
            priority_id: task.priority_id,
            del_flag: task.del_flag,
            priority_name: task.tbl_priority_mst.priority_name, // Include only the priority name
        }));


        if (flattenedTasks.length !== 0) {
            res.json(flattenedTasks);
        } else {
            res.json([]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch data' })
    }
});

router.get('/task/:task_id', async (req, res) => {
    const taskId = req.params.task_id;
    try {
        const task = await Task.findOne({
            where: {
                task_id: taskId
            },
            include: [Priority]
        });

        if (task === null) {
            res.json(task);
        } else {

            const flattenedTasks = {
                task_id: task.task_id,
                task_name: task.task_name,
                task_start: task.task_start,
                task_end: task.task_end,
                task_description: task.task_description,
                priority_id: task.priority_id,
                del_flag: task.del_flag,
                priority_name: task.tbl_priority_mst.priority_name, // Include only the priority name
            };

            res.json(flattenedTasks);
        }
    } catch (error) {
        console.error(error);
    }
});

router.post('/new-task/:priority_id', async (req, res) => {
    const { task_name, task_description, task_start, task_end } = req.body;
    const priorityId = req.params.priority_id;
    try {
        const newTask = await Task.create({
            task_name,
            task_description,
            task_start,
            task_end,
            priority_id: priorityId,
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
            where: { task_id: taskId },
            returning: true,
        });

        if (deletedTask === 0) {
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
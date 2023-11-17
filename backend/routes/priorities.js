const express = require('express');
const router = express.Router();

const Priority = require('../models/priority');

router.get('/all-priority', async (req, res) => {
    try {
        const priorities = await Priority.findAll({
            where: {
                del_flag: 0
            },
        });
        if(priorities.length !== 0) {
            res.json(priorities);
        } else {
            res.json(priorities);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch data' })
    }
});

router.get('/priority/:priority_id', async(req, res) => {
    const priorityId = req.params.priority_id;
    try {
        const priority = await Priority.findOne({
            where: {
                priority_id: priorityId
            },
        });

        if (priority === null) {
            res.json(priority);
        } else {

            const flattenedPriority = {
                priority_id: priority.priority_id,
                priority_name: priority.priority_name
            };

            res.json(flattenedPriority);
        }
    } catch (error) {
        console.error(error);
    }
})

module.exports = router;
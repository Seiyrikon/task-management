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

module.exports = router;
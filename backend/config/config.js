const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('task_management_db', 'root', 'tsukiden+', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;
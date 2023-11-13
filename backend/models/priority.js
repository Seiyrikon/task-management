const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");

const Priority = sequelize.define('tbl_priority_mst', {
    priority_id: { // Update the field name to match the table
        type: DataTypes.INTEGER, // Assuming task_id is an integer
        autoIncrement: true,
        primaryKey: true,
      },
    priority_name: {
        type: DataTypes.STRING,
    },
    del_flag: {
        type: DataTypes.INTEGER,
    },
}, {
    tableName: 'tbl_priority_mst',
    timestamps: false,
});

module.exports = Priority;
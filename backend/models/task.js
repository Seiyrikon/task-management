const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");

const Task = sequelize.define('tbl_task_mst', {
    task_id: { // Update the field name to match the table
      type: DataTypes.INTEGER, // Assuming task_id is an integer
      autoIncrement: true,
      primaryKey: true,
    },
    task_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    task_description: {
      type: DataTypes.STRING,
    },
    del_flag: {
        type: DataTypes.INTEGER,
    }
  }, {
    tableName: 'tbl_task_mst',
    timestamps: false,
  });
  

module.exports = Task;
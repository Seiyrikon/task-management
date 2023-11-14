const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");
const Priority = require('./priority');

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
    task_start: {
      type: DataTypes.TIME,
    },
    task_end: {
      type: DataTypes.TIME,
    },
    task_description: {
      type: DataTypes.STRING,
    },
    priority_id: {
      type: DataTypes.INTEGER,
    },
    del_flag: {
        type: DataTypes.INTEGER,
    }
  }, {
    tableName: 'tbl_task_mst',
    timestamps: false,
  });

  Task.belongsTo(Priority, { foreignKey: 'priority_id' });
  

module.exports = Task;
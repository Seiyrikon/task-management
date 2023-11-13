const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");

const Priority = sequelize.define('tbl_priority_mst', {
    priority_name: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'tbl_priority_mst',
    timestamps: false,
});

module.exports = Priority;
DROP DATABASE IF EXISTS task_management_db;
CREATE DATABASE task_management_db;
USE task_management_db;


DROP TABLE IF EXISTS tbl_task_mst;
CREATE TABLE tbl_task_mst (
	task_id INT(9) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    task_name VARCHAR(50) NOT NULL,
    task_description VARCHAR(255),
    del_flag INT(1) NOT NULL DEFAULT 0,
    reg_id VARCHAR(50) DEFAULT "1",
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_id VARCHAR(50) DEFAULT "1",
    update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

DROP DATABASE IF EXISTS task_management_db;
CREATE DATABASE task_management_db;
USE task_management_db;

DROP TABLE IF EXISTS tbl_priority_mst;
CREATE TABLE tbl_priority_mst (
	priority_id INT(9) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    priority_name VARCHAR(255) NOT NULL,
    del_flag INT(1) NOT NULL DEFAULT 0,
    reg_id VARCHAR(50) DEFAULT "1",
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_id VARCHAR(50) DEFAULT "1",
    update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS tbl_task_mst;
CREATE TABLE tbl_task_mst (
	task_id INT(9) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    task_name VARCHAR(50) NOT NULL,
    task_description VARCHAR(255),
    task_start TIME,
    task_end TIME,
    priority_id INT(9) UNSIGNED,
    del_flag INT(1) NOT NULL DEFAULT 0,
    reg_id VARCHAR(50) DEFAULT "1",
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_id VARCHAR(50) DEFAULT "1",
    update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE tbl_task_mst
ADD CONSTRAINT fk_priority
FOREIGN KEY (priority_id) REFERENCES tbl_priority_mst(priority_id);

INSERT INTO tbl_priority_mst(priority_name) VALUES 
('Low'),
('Normal'),
('High');

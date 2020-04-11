DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department(
id INT AUTO_INCREMENT NOT NULL,
department_name VARCHAR(30),
PRIMARY KEY (id)
);

CREATE TABLE role(
id INT AUTO_INCREMENT NOT NULL,
title VARCHAR(30),
salary DECIMAL(10,2),
department_id INT,
PRIMARY KEY (id),
FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee(
id INT AUTO_INCREMENT NOT NULL,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT,
PRIMARY KEY (id),
FOREIGN KEY (role_id) REFERENCES role(id)
)

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;

-- show empolyee names with id, title and salary
SELECT employee.id, employee.first_name, employee.last_name,department.department_name, role.title, role.salary
FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id;

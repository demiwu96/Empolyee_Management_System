# Empolyee Management System

## Description
This is an app for companies to manage employees, roles and departments information.
The user can start the app through one command:
```sh
node index.js
```
The user will be prompt for options to view, add, update, or delete employees, roles, and departments:
* View
    * All Employees
    * Employees By Department of your choice
    * Employees By Manager of your choice
    * All Roles
    * All Departments
    * Utilized Budget of Department of your choice
* Add
    * Employee: request for first name, last name, role and manager inputs
    * Role: request for title, salary, department inputs
    * Department: request for department name input
* Update
    * Employee Role: change employee's role
    * Employee Manager: change employee's manager
* Delete
    * Employee
    * Role
    * Department

Based on the user's choice, additional information inputs may be required.

## Installation
* npm required:
    * [inquirer](https://www.npmjs.com/package/inquirer)
    * [mysql](https://www.npmjs.com/package/mysql)

Run the following commend in the terminal to install the required npm:
```sh
npm install
```

## Built with
* JavaScript
* Node.js
* MySQL

## Credits
Yu-Hsuan Wu

## Demo
![demo](./demo/demo.gif)

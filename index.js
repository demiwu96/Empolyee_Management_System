const inquirer = require("inquirer");
const mysql = require("mysql");

let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Demiwu-0912",
    database: "company_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    startSystem();
});

const startSystem = () => {
    inquirer
        .prompt({
            type: "rawlist",
            message: "Hello! What would you like to do?",
            name: "options",
            choices: [
                "View All Employees",
                // "View All Employees By Department",
                // "View All Employees By Manager",
                "Add Employees",
                // "Remove Employees",
                "Update Employee Role",
                // "Update Employee Manager",
                "View All Roles",
                "Add Roles",
                "View All Departments",
                "Add Departments",
                "Exit"
            ]
        })
        .then(function (res) {
            switch (res.options) {
                case "View All Employees":
                    viewAll("employee");
                    break;

                case "Add Employees":
                    addEmployees();
                    break;

                case "Update Employee Role":
                    updateEmployee();
                    break;

                case "View All Roles":
                    viewAll("role");
                    break;

                case "Add Roles":
                    addRoles();
                    break;

                case "View All Departments":
                    viewAll("department");
                    break;

                case "Add Departments":
                    addDepartments();
                    break;

                default:
                    connection.end();
                    break;
            }
        });
};

const viewAll = tableName => {
    var query;
    switch (tableName) {
        case "employee":
            query = "SELECT employee.id, employee.first_name, employee.last_name,department_name, role.title, role.salary FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id"
            connection.query(query, (err, res) => {
                if (err) throw err;
                console.log("\n");
                console.table(res);
                console.log("--------------------------------------------------");
                startSystem();
            });
            break;

        case "role":
            query = "SELECT role.id,role.title, department.department_name FROM role JOIN department ON role.department_id = department.id ORDER BY role.id"
            connection.query(query, (err, res) => {
                if (err) throw err;
                console.log("\n");
                console.table(res);
                console.log("--------------------------------------------------");
                startSystem();
            });
            break;

        case "department":
            connection.query("SELECT * FROM " + tableName, (err, res) => {
                if (err) throw err;
                console.log("\n");
                console.table(res);
                console.log("--------------------------------------------------");
                startSystem();
            });
            break;
    }
};

// const addEmployees = () => {
//     connection.query("SELECT * FROM roles", function (err, result) {
//         if (err) throw err;
//         inquirer
//             .prompt([
//                 {
//                     name: "firstName",
//                     message: "Enter the employee's first name: "
//                 },
//                 {
//                     name: "lastName",
//                     message: "Enter the employee's last name: "
//                 },
//                 {
//                     type: "list",
//                     name: "role",
//                     message: "What is the employee's role?",
//                     choices: function () {
//                         var choiceArray = [];
//                         for (var i = 0; i < result.length; i++) {
//                             choiceArray.push(result[i].title);
//                         }
//                         return choiceArray;
//                     },
//                 },
//                 {
//                     name: "manager",
//                     message: "Who is the manager of this employee?"
//                 }
//             ])
//             .then(res => {
//                 var query = connection.query(
//                     "INSERT INTO employee SET ?",
//                     {
//                         first_name: res.firstName,
//                         last_name: res.lastName,
//                         role_id: ,
//                         manager_id:,
//                     },
//                     function (err, res) {
//                         if (err) throw err;
//                         console.log(`${res.firstName} ${res.lastName} added`);
//                         console.log("------------------------------------------------------------");
//                     }
//                 );
//             });

//     });
// };

// const addRoles = () => {

// }

// const addDepartments = () => {

// }
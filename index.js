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
                "View All Employees By Department",
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

                case "View All Employees By Department":
                    viewByDepartment();
                    break;

                case "Add Employees":
                    addEmployees();
                    break;

                case "Update Employee Role":
                    updateEmployeeRole();
                    break;

                case "Update Employee Manager":
                    updateEmployeeManager();
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
            // get employee information from database
            query = "SELECT employee.id, employee.first_name, employee.last_name,department_name, role.title, role.salary FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id"
            connection.query(query, (err, res) => {
                if (err) throw err;
                console.log("\n");
                console.table(res);
                console.log("========================================================================================");
                startSystem();
            });
            break;

        case "role":
            // get role information from database
            query = "SELECT role.id,role.title, department.department_name FROM role JOIN department ON role.department_id = department.id ORDER BY role.id"
            connection.query(query, (err, res) => {
                if (err) throw err;
                console.log("\n");
                console.table(res);
                console.log("========================================================================================");
                startSystem();
            });
            break;

        case "department":
            // get department information from database
            connection.query("SELECT * FROM department", (err, res) => {
                if (err) throw err;
                console.log("\n");
                console.table(res);
                console.log("========================================================================================");
                startSystem();
            });
            break;
    }
};

const viewByDepartment = () => {
    connection.query("SELECT * FROM department", function (err, result) {
        if (err) throw err;
        // prompt the user for the department 
        inquirer
            .prompt(
                {
                    type: "rawlist",
                    name: "chooseDepartment",
                    message: "Which department?",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < result.length; i++) {
                            choiceArray.push(result[i].department_name);
                        }
                        return choiceArray;
                    },
                })
            .then(res => {
                var chosen;
                for (var i = 0; i < result.length; i++) {
                    if (result[i].department_name === res.chooseDepartment) {
                        chosen = result[i];
                    }
                }
                // get the employee information in the chosen department
                connection.query(
                    "SELECT employee.id, employee.first_name, employee.last_name,department.department_name, role.title, role.salary FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id WHERE department.id = ?",
                    [chosen.id], function (err, res) {
                        if (err) throw err;
                        console.log("\n");
                        console.table(res);
                        console.log("========================================================================================");
                        startSystem();
                    }
                );
            });
    });
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

const updateEmployeeRole = () => {
    connection.query("SELECT * FROM employee", function (err, resultE) {
        if (err) throw err;
        connection.query("SELECT * FROM role", function (err, resultR) {
            if (err) throw err;
            // prompt user for the employee and role for the update
            inquirer
                .prompt([
                    {
                        type: "rawlist",
                        name: "chooseEmployee",
                        message: "Which empolyee needs to be updated?",
                        choices: function () {
                            var choiceArray = [];
                            for (var i = 0; i < resultE.length; i++) {
                                choiceArray.push(resultE[i].first_name + " " + resultE[i].last_name);
                            }
                            return choiceArray;
                        },
                    },
                    {
                        type: "rawlist",
                        name: "chooseRole",
                        message: "What is this person's new role?",
                        choices: function () {
                            var choiceArray = [];
                            for (var i = 0; i < resultR.length; i++) {
                                choiceArray.push(resultR[i].title);
                            }
                            return choiceArray;
                        },
                    }])
                .then(res => {
                    // get employee data through matching first name from the database
                    let nameArr = res.chooseEmployee.split(" ");
                    let chosenE;
                    for (var i = 0; i < resultE.length; i++) {
                        if (resultE[i].first_name === nameArr[0]) {
                            chosenE = resultE[i];
                        }
                    };
                    // get role through matching name from the database
                    let chosenR;
                    for (var i = 0; i < resultR.length; i++) {
                        if (resultR[i].title === res.chooseRole) {
                            chosenR = resultR[i];
                        }
                    };
                    // set the employee id with the new role id
                    connection.query(
                        "UPDATE employee SET ? WHERE ? ",
                        [
                            {
                                role_id: chosenR.id
                            },
                            {
                                id: chosenE.id
                            },
                        ], function (err, res) {
                            if (err) throw err;
                            console.log("\n Updated!");
                            console.log("------------------------------------------------------------");
                            startSystem();
                        }
                    );
                });
        });
    });

};

const addRoles = () => {
    connection.query("SELECT * FROM department", function (err, result) {
        if (err) throw err;
        // prompt the user for the role information
        inquirer
            .prompt([
                {
                    name: "roleTitle",
                    message: "Enter the role title: "
                },
                {
                    type: "number",
                    name: "salary",
                    message: "Enter the salary for this position: "
                },
                {
                    type: "rawlist",
                    name: "chooseDepartment",
                    message: "Which department is this position in?",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < result.length; i++) {
                            choiceArray.push(result[i].department_name);
                        }
                        return choiceArray;
                    },
                }
            ])
            .then(res => {
                // get the chosen department information from the database
                let chosenD;
                for (var i = 0; i < result.length; i++) {
                    if (result[i].department_name === res.chooseDepartment) {
                        chosenD = result[i];
                    }
                }
                // add the new role information to the database
                connection.query(
                    "INSERT INTO role SET ?",
                    {
                        title: res.roleTitle,
                        salary: res.salary,
                        department_id: chosenD.id
                    },
                    function (err, res) {
                        if (err) throw err;
                        console.log('Successfully added!');
                        console.log("--------------------------------------------------------------------------");
                        startSystem();
                    }
                );
            });
    });
};

const addDepartments = () => {
    // prompt the user for department information
    inquirer
        .prompt({
            name: "departmentName",
            message: "Enter the department name: "
        })
        .then(res => {
            // add the new department to the database
            connection.query(
                "INSERT INTO department SET ?",
                {
                    department_name: res.departmentName
                },
                function (err, res) {
                    if (err) throw err;
                    console.log("Successfully added!");
                    console.log("--------------------------------------------------------------------------");
                    startSystem();
                }
            );
        });
}
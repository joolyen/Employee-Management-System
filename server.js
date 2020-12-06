var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "0Trucr@2be",
  database: "employeetracker_db"
});

// connect to the mysql server and sql database
connection.connect((err) => {
  if (err) throw err;
  search();
});

// functions for application

function search() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "Add employee",
                "Add department",
                "Add position",
                "View employees",
                "View departments",
                "View positions",
                "Update employee position",
                "Exit"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "Add employee":
                    AddEmployee();
                    break;

                case "Add department":
                    AddDepartment();
                    break;

                case "Add position":
                    AddPosition();
                    break;

                case "View employees":
                    ViewEmployees();
                    break;

                case "View departments":
                    ViewDepartments();
                    break;

                case "View positions":
                    ViewPositions();
                    break;

                case "Update employee position":
                    UpdateEmployeePosition();
                    break;

                case "Exit":
                    connection.end();
                    break;
            }
        });
}


function AddEmployee() {
    let query = "SELECT title FROM employeetracker_db.position";
    connection.query(query, function (err, res) {
        if (err) throw err;
        let positionArray = [];
        inquirer
            .prompt([

                {
                    type: "input",
                    message: "What's the first name of the employee?",
                    name: "firstname"
                },
                {
                    type: "input",
                    message: "What's the last name of the employee?",
                    name: "lastname"
                },
                {
                    type: "rawlist",
                    choices: function () {
                        for (let i = 0; i < res.length; i++) {
                            positionArray.push(res[i].title);
                        }
                        return positionArray;
                    },
                    message: "What is the employee's position?",
                    name: "position",
                },
                {
                    type: "input",
                    message: "What is the employer's manager ID #?",
                    name: "managerID"
                }
            ])
            .then(function (answer) {
                let query = "INSERT INTO employee SET ?";
                connection.query(query,
                    {
                        first_name: answer.firstname,
                        last_name: answer.lastname,
                        position_id: positionArray.indexOf(answer.position) + 1,
                        manager_id: answer.managerID
                    },
                    function (err) {
                        if (err) throw err;
                    });

                search();
            });
    });
}


function AddDepartment() {
    inquirer
        .prompt({
            type: "input",
            message: "What is the name of the department you'd like to add?",
            name: "departname"
        })
        .then(function (answer) {
            let query = "INSERT INTO department SET?";
            connection.query(query, { name: answer.departname }, function (err, res) {
                if (err) throw err;
                search();
            });
        });
}


function AddPosition() {
    let query = "SELECT name FROM employeetracker_db.department";
    connection.query(query, function (err, res) {
        if (err) throw err;
        let deptArray = [];

        inquirer
            .prompt([
                {
                    type: "input",
                    message: "What's the name of the position?",
                    name: "positionname"
                },
                {
                    type: "input",
                    message: "What is the salary for this position?",
                    name: "salary"
                },
                {
                    type: "rawlist",
                    choices: function () {
                        for (let i = 0; i < res.length; i++) {
                            deptArray.push(res[i].name);
                        }
                        return deptArray;
                    },
                    message: "What department would you like to add the new position to?",
                    name: "dept"
                },
            ])
            .then(function (answer) {
                let query = "INSERT INTO position SET?";
                connection.query(query,
                    {
                        title: answer.positionname,
                        salary: answer.salary,
                        department_id: deptArray.indexOf(answer.dept) + 1
                    },
                    function (err) {
                        if (err) throw err;
                        search();
                    });
            });
    });
}


function ViewEmployees() {
    let query = "SELECT first_name AS FirstName , last_name as LastName , position.title as position, position.salary AS Salary, department.name AS Department"; 
    query += " FROM employee INNER JOIN department ON department.id = employee.position_id left JOIN position ON position.id = employee.position_id";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        search();
    });

}

function ViewDepartments() {
    let query = "SELECT name AS Department FROM department";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        search();
    });
}

function ViewPositions() {
    let query = "SELECT title AS position FROM position";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        search();
    });

}

function UpdateEmployeePosition() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Which employee would you like to update?",
                name: "employeeUpdate"
            },

            {
                type: "input",
                message: "What do you want to update to?",
                name: "positionUpdate"
            }
        ])
        .then(function (answer) {
            let query = "UPDATE employee SET position_id=? WHERE first_name= ?";
            connection.query(query, [answer.positionUpdate, answer.employeeUpdate], function (err, res) {
                if (err) throw err;
                console.table(res);
                search();
            });
        });
}
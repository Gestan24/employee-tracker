const dotenv = require('dotenv');
dotenv.config()

const inquirer = require('inquirer');


const mysql = require('mysql2');

const cTable = require('console.table');



const connection = mysql.createConnection(

    {

        host: 'localhost',

        // Your MySQL username,
        user: 'root',

        // Your MySQL password
        password: process.env.MY_PASSWORD,
        database: 'employee_tracker'

    }



);

connection.connect((err) => {

    if (err) throw err;



    console.log('sql connected!');

    promptTrack();




});

const promptTrack = () => {

    return inquirer.prompt([

        {

            type: 'list',

            name: 'option',

            message: 'What would you like to do?',

            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'],

            validate: optionInput => {

                if (optionInput) {

                    return true

                } else {

                    console.log('Please choose what you would like to do!');

                    return false;

                }

            }

        }

    ])

        .then(answers => {

            if (answers.option === 'View All Employees') {

                return getEmployees();

            } else if (answers.option === 'Add Employee') {

                return addEmployee();

            } else if (answers.option === 'Update Employee Role') {

                return updateEmployee();

            } else if (answers.option === 'View All Roles') {

                return getRoles();

            } else if (answers.option === 'Add Role') {

                return addRole();

            } else if (answers.option === 'View All Departments') {

                return getDepartments();

            } else if (answers.option === 'Add Department') {

                return addDepartment();

            } else if (answers.option === 'Quit') {

                return quit();

            }

        })

}


const getEmployees = () => {

    const sql = `SELECT 
    employee.id AS id, employee.first_name AS first_name, employee.last_name AS last_name, roles.title AS job_title, roles.salary AS salary, department.department_name AS department_name, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name
    
    FROM employee
    
    LEFT JOIN roles on employee.role_id = roles.id AND employee.role_id = roles.id
    LEFT JOIN department ON roles.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id;`

    connection.execute(sql, (err, results) => {

        const table = cTable.getTable(results);

        if (err) {

            return err

        }

        console.log(table);

        promptTrack();
    })


}

const addEmployee = () => {

    connection.query('SELECT * FROM roles', (err, results) => {

        if (err) throw err;


        return inquirer.prompt([


            {

                type: 'input',

                name: 'firstName',

                message: "Please enter your employee's first name",

                validate: firstName => {

                    if (firstName) {

                        return true

                    } else {

                        console.log('Please enter a first name for your employee!');

                        return false;

                    }

                }

            },

            {

                type: 'input',

                name: 'lastName',

                message: "Please enter your employee's last name",

                validate: lastName => {

                    if (lastName) {

                        return true;

                    } else {

                        console.log('Please enter a last name for your employee!');

                        return false;

                    }

                }


            },

            {

                type: 'rawlist',

                name: 'roleId',

                message: "What is your employee's role?",

                choices: function () {

                    var choiceArr = [];

                    for (i = 0; i < results.length; i++) {

                        choiceArr.push(results[i].id)

                    }

                    return choiceArr;
                }


            },

            {

                type: 'number',

                name: 'managerId',

                message: 'Enter manager ID (Has to be a number)',

                default: '1',

                validate: value => {

                    if (isNaN(value) === false) {

                        return true;

                    }

                    return false;
                }
            }
        ]).then(answer => {

            const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;

            const params = [answer.firstName, answer.lastName, answer.roleId, answer.managerId];


            connection.execute(sql, params, (err, results) => {

                const table = cTable.getTable(results);

                if (err) throw err;

                console.log(table);

                promptTrack();
            })

        });

    });


}


const updateEmployee = () => {

    const sql = ``
}







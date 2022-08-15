SELECT 
employee.id AS id, employee.first_name AS first_name, employee.last_name AS last_name, roles.title AS job_title, roles.salary AS salary, department.department_name AS department_name, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name

FROM employee

LEFT JOIN roles on employee.role_id = roles.id AND employee.role_id = roles.id
LEFT JOIN department ON roles.department_id = department.id
LEFT JOIN employee manager ON employee.manager_id = manager.id;











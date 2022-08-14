SELECT
roles.id as id, roles.title as title, department.department_name as department, roles.salary as salary

FROM roles

JOIN department on roles.department_id = department.id;
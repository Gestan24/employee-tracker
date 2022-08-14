INSERT INTO department (id, department_name)

VALUES
(1,'Engineering'),
(2, 'Finance'),
(3, 'Legal'),
(4, 'Sales');



INSERT INTO roles (id, title, salary, department_id)

VALUES
(1, 'Sales Lead', 100000, 4),
(2, 'Salesperson', 80000, 4),
(3, 'Lead engineer', 150000, 1),
(4, 'Software engineer', 120000, 1),
(5, 'Account manager', 160000, 2),
(6, 'Accountant', 125000, 2),
(7, 'Legal team', 250000,3),
(8, 'Lawyer', 190000, 3);


INSERT INTO employee (first_name, last_name, role_id, manager_id)

VALUES
('John', 'Doe', 1, null),
('Jane', 'Doe', 2, 1),
('Zeke', 'Jenkins', 3, null),
('Luke', 'Robertson', 4, 3),
('Zane', 'Mcgee', 5, null),
('Rue', 'Daniels', 6, 5),
('Stacy', 'Williams', 7, null),
('Jake', 'Mcgraw', 8, 7);
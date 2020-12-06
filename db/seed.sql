USE employeetracker_db;

INSERT into department (name)
VALUES ("Marketing"), 
       ("Technology"), 
       ("Accounting"), 
       ("Recruiting");


INSERT INTO role (title, salary, department_id)
VALUES ("Technologist", 275000.00, 1),
       ("Copywriter", 105000.00, 1),
       ("Developer", 175000.00, 2), 
       ("Engineer", 185000.00, 2),
       ("Accountant", 92000.00, 3), 
       ("Recruiter", 50000.00, 4);


INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Paulie", "Walnuts", 1), 
       ("Tori", "Flexington", 3), 
       ("Joey", "Fotorolla", 2), 
       ("Ron", "Louis", 1),
       ("Bill", "Bixby", 3),
       ("Tom", "Thumb", 4),
       ("Bruce", "Leroy", 1),
       ("Leroy", "Fame", 2),
       ("Shawn", "Carter", 4);
       
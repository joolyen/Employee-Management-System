DROP DATABASE IF EXISTS employeetracker_db;
CREATE database employeetracker_db;

USE employeetracker_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE position (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL(10,2),
  department_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY(department_id) REFERENCES department (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  position_id INT NOT NULL,
  manager_id INT, 
  PRIMARY KEY (id),
  FOREIGN KEY (manager_id) REFERENCES employee(id),
  FOREIGN KEY(position_id) REFERENCES position(id)
);

INSERT INTO department (name)
VALUES ("Marketing"), 
       ("Technology"), 
       ("Accounting"), 
       ("Recruiting")


INSERT INTO position (title, salary, department_id)
VALUES ("Technologist", 275000.00, 1),
       ("Copywriter", 105000.00, 1),
       ("Developer", 175000.00, 2), 
       ("Engineer", 185000.00, 2),
       ("Accountant", 92000.00, 3), 
       ("Recruiter", 50000.00, 4),


INSERT INTO employee (first_name, last_name, position_id)
VALUES ("Paulie", "Walnuts", 1), 
       ("Tori", "Flexington", 3), 
       ("Joey", "Fotorolla", 2), 
       ("Ron", "Louis", 1),
       ("Bill", "Bixby", 3),
       ("Tom", "Thumb", 4),
       ("Bruce", "Leroy", 1)
       ("Leroy", "Fame", 2)
       ("Shawn", "Carter", 4);
       
SELECT * FROM department;
SELECT * FROM position;
SELECT * FROM employee;

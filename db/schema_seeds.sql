CREATE DATABASE burgers_db;

USE burgers_db;

CREATE TABLE burgers(
id INT(11) AUTO_INCREMENT NOT NULL PRIMARY KEY,
burger_name VARCHAR(100) NOT NULL,
devoured BOOLEAN DEFAULT false
);

INSERT INTO burgers(burger_name)
VALUES("Bacon Cheesburger"),
("Jalepeno Ranch Burger"),
("Double Burger Deluxe"),
("Buffalo Burger"),
("Whopper"),
("Big Mac");

SELECT * FROM burgers;
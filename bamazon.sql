DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(150),
    department_name VARCHAR(150),
    price DECIMAL(8, 2),
    stock_quantity INT,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Amazon Echo", "Tech", "100.00", "500");
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Amazon Fire Stick", "Tech", "40.00", "150");
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("doTerra Essential Oils", "Beauty", "30.00", "475");
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Davines Hairspray", "Beauty", "20.50", "100");
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nutella", "Grocery", "3.00", "45");
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Brownie Brittle", "Grocery", "2.50", "80");
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Skinny Pop Popcorn", "Grocery", "6.00", "55");
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Crock Pot", "Home Appliances", "35.00", "15");
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("KitchenAid Mixer", "Home Appliances", "200.00", "20");
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Keurig", "Home Appliances", "80.00", "30");




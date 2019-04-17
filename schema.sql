DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INT AUTO_INCREMENT PRIMARY KEY,
product_name VARCHAR(30) NOT NULL,
department_name VARCHAR(30) NOT NULL,
price DECIMAL(13,2),
stock_quantity INT
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("TV", "electronics", 499.99, 16);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("computer", "electronics", 1299.99, 52);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("laptop", "electronics", 2999.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("phone", "electronics", 799.99, 68);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("T-shirt", "clothing", 7.99, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("shorts", "clothing", 5.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("pants", "clothing", 9.99, 120);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("banana", "food", 3.99, 70);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("apple", "food", 1.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("strawberry", "food", 4.99, 100);

SELECT * FROM products
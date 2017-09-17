DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INTEGER(11) auto_increment NOT NULL,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10, 2) NULL,
  stock_quantity INTEGER(10) NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hat", "winter clothing", 10.50, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Scarf", "winter clothing", 21.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mittens", "winter clothing", 9.95, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Laptop", "electronics", 549.95, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Noise Canceling Headphones", "electronics", 69.95, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Speakers", "electronics", 39.95, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Patio Chairs", "lawn and garden", 169.95, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Blue Flower Pot", "lawn and garden", 6.95, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Watering Can", "lawn and garden", 26.95, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("'The Fellowship of the Ring' by JRR Tolkien", "books", 12.05, 100);

CREATE DATABASE nilelistdb;

CREATE TABLE products(
    item_id INTEGER NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50),
    department_name VARCHAR(30),
    price DECIMAL(5,2),
    stock_quantity INTEGER(10),
    PRIMARY KEY (item_id)
);

INSERT INTO products VALUES(0, "Glorious Junk", "Household Goods", 17.99, 10);
INSERT INTO products VALUES(0, "Dehydrated Water", "Medicine and Chemistry", 111.92, 8);
INSERT INTO products VALUES(0, "Static Lube", "Tools and Hardware", 125.42, 5);
INSERT INTO products VALUES(0, "Ultra-Fine Grit", "Tools and Hardware", 198.07, 14);
INSERT INTO products VALUES(0, "Digital Paperweight", "Household Goods", 127.13, 12);
INSERT INTO products VALUES(0, "Psychotic Sculpture", "Household Goods", 167.93, 7);
INSERT INTO products VALUES(0, "Non-Euclidean Maps", "Odd Odds and Ends", 125.14, 9);
INSERT INTO products VALUES(0, "Two-Dimensional Tesseract", "Odd Odds and Ends", 15.83, 12);
INSERT INTO products VALUES(0, "Designer Genes", "Medicine and Chemistry", 10.53, 16);
INSERT INTO products VALUES(0, "Purebred Timber", "Tools and Hardware", 9.51, 19);
INSERT INTO products VALUES(0, "Chaos Organizer", "Household Goods", 5.29, 13);
INSERT INTO products VALUES(0, "Extra-floppy Firmware", "Tools and Hardware", 9.21, 14);

SELECT * FROM products;
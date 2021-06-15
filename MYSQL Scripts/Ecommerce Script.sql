create database ecommerce; 
use ecommerce;   

CREATE TABLE users
(id int(10) unsigned NOT NULL AUTO_INCREMENT,    
 name varchar(50),
 email varchar(50),
 password varchar(255) DEFAULT NULL,
 city varchar(50), 
 PRIMARY KEY (id )    
);    

INSERT INTO users(name, email, password, city) VALUES ('Regular','regular@example.com', MD5('password'), 'Lahore');
INSERT INTO users(name, email, password, city) VALUES ('Admin','admin@example.com', MD5('password'), 'Karachi');
SELECT *from users;

CREATE TABLE products
(id int(10) unsigned NOT NULL AUTO_INCREMENT,    
 name varchar(50),
 stock int(10),
 price decimal(10,2),
 shortDesc varchar(50),
 description varchar(200),
 image MEDIUMBLOB,
 PRIMARY KEY (id )    
);    

INSERT INTO products(name, stock, price) VALUES ('Apple Airpods', 5 , 15000.00);
Select *from products;

CREATE TABLE orders
(id int(10) unsigned NOT NULL AUTO_INCREMENT,    
 UserId int(10) unsigned NOT NULL,
 ProductId int(10) unsigned NOT NULL,
 PRIMARY KEY (id ),
 FOREIGN KEY (UserId) REFERENCES users(id),
 FOREIGN KEY (ProductId) REFERENCES products(id)
);  

Select *from orders; 



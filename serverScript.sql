drop database if exists bamazon_db;

create database bamazon_db;
use bamazon_db;

create table products(
    item_id int(11) unsigned auto_increment,
    item_name varchar(45) not null,
    department_name varchar(45) not null,
    price float(11,2) unsigned not null,
    stock_quantity int(11) unsigned not null,
    primary key (item_id)
);

insert into products(item_name, department_name, price, stock_quantity)
    values 
     ('Bananas','Grocery', 0.49, 10),
     ('TV','Electronics', 100, 3),
     ('Laptop','Electronics', 500, 1),
     ('Apples','Grocery', 1, 11),
     ('Raw Almonds','Grocery', 8, 5),
     ('Yogurt','Grocery',2,6),
     ('Premium Ultra Fidget Spinner','Widgets',3,111),
     ('USB Cable','Electronics',7,10),
     ('Pipes','Construction',22,32),
     ('Socks','Clothing',4,90);

select * from products;
          
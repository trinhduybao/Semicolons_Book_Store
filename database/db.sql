create database Semicolons_Book_Store
go

use Semicolons_Book_Store
go


create table items(
	id int identity(1,1),
	[name] nvarchar(50) not null unique,
	primary key (id)
)

create table categories(
	id int identity(1,1),
	[name] nvarchar(50) unique,	
	item_id int not null,
	primary key (id),
	foreign key (item_id) references items(id)
)

create table products(
	id int identity(1,1),
	thumbnail_image varchar(max) not null,
	name nvarchar(255) not null,
	price decimal(10,2) not null,
	suppllier nvarchar(255),
	author nvarchar(255),
	published_date datetime,
	page_count int,
	description nvarchar(255),
	quantity int,
	brand nvarchar(255),
	made_in nvarchar(255),
	origin nvarchar(255),
	color nvarchar(255),
	material nvarchar(255),
	category_id int,
	primary key (id),
	foreign key (category_id) references categories(id)
)

create table accounts(
	id int identity(1,1),
	username varchar(50) not null unique,
	[password] varchar(50) not null,
	email varchar(100) not null,
	first_name nvarchar(100),
	last_name nvarchar(100),
	[address] nvarchar(500),
	primary key (id)
)

create table favorites(
	id int identity(1,1),
	account_id int,
	product_id int,
	primary key (id),
	foreign key (account_id) references accounts(id),
	foreign key (product_id) references products(id)
)

create table feedbacks(
	id int identity(1,1),
	rate int not null,
	content nvarchar(300),
	create_date datetime,
	account_id int,
	product_id int,
	primary key (id),
	foreign key (account_id) references accounts(id),
	foreign key (product_id) references products(id)
)

create table roles (
	id int identity(1,1),
	[name] varchar(20) not null,
	primary key(id)
)


create table authorities(
	authority_id int identity(1,1),
	role_id int,
	account_id int,
	primary key(authority_id),
	foreign key (account_id) references accounts(id),
	foreign key (role_id) references roles(id)
)

create table vouchers(
	id int identity(1,1),
	code varchar(10) not null,
	discount_amount decimal(10,2) not null,
	condition decimal(10,2) not null,
	valid_form datetime not null,
	valid_to datetime not null,
	create_date datetime not null,
	primary key(id)
)

create table orders(
	id int identity(1,1),
	order_date datetime not null,
	total_amount decimal(10,2) not null,
	[status] nvarchar(100) not null,
	[address] nvarchar(500) not null,
	voucher_id int,
	account_id int,
	primary key(id),
	foreign key (account_id) references accounts(id),
	foreign key (voucher_id) references vouchers(id)
)

create table order_details(
	order_detail_id int identity(1,1),
	quantity int not null,
	price decimal(10,2) not null,
	order_id int,
	product_id int,
	primary key (order_detail_id),
	foreign key (order_id) references orders(id),
	foreign key (product_id) references products(id)
)

create table product_images(
	id int identity(1,1),
	image_url varchar(max) not null,
	product_id int,
	primary key (id),
	foreign key (product_id) references products(id)
)
go

--dữ liệu mẫu bảng item
INSERT INTO items ([name]) VALUES (N'Văn Phòng Phẩm');
INSERT INTO items ([name]) VALUES (N'Sách Trong Nước');
INSERT INTO items ([name]) VALUES (N'Foreign Books');

--dữ liệu mẫu categories
INSERT INTO categories ([name], item_id) VALUES (N'Văn Học Cổ Điển', 2);
INSERT INTO categories ([name], item_id) VALUES (N'Kinh Tế', 2);
INSERT INTO categories ([name], item_id) VALUES (N'Bìa Còng', 1);
INSERT INTO categories ([name], item_id) VALUES (N'Science Fiction', 3);
INSERT INTO categories ([name], item_id) VALUES (N'Tâm Lý - Kỹ Năng Sống', 2);
INSERT INTO categories ([name], item_id) VALUES (N'Văn Học Hiện Đại', 2);
INSERT INTO categories ([name], item_id) VALUES (N'Bút Bi', 1);
INSERT INTO categories ([name], item_id) VALUES (N'Băng Dính', 1);
INSERT INTO categories ([name], item_id) VALUES (N'Lịch Sử', 2);
INSERT INTO categories ([name], item_id) VALUES (N'Adventure', 3);
INSERT INTO categories ([name], item_id) VALUES (N'Giáo Dục', 2);
INSERT INTO categories ([name], item_id) VALUES (N'Kẹp Giấy', 1);
INSERT INTO categories ([name], item_id) VALUES (N'Medicine', 3);
INSERT INTO categories ([name], item_id) VALUES (N'Thần Thoại', 2);
INSERT INTO categories ([name], item_id) VALUES (N'Sổ Tay', 1);


select * from accounts
select * from authorities
select * from categories
select * from favorites
select * from roles
select * from products
select * from product_images
select * from orders
select * from order_details
select * from vouchers
select * from feedbacks
select * from items

--DROP DATABASE Semicolons_Book_Store;
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
	[name] nvarchar(50) not null unique,
	item_id int not null,
	primary key (id),
	foreign key (item_id) references items(id)
)

create table products(
	id int identity(1,1),
	thumbnail_image varchar(max) not null,
	name nvarchar(255) not null,
	price decimal(10,2) not null,
	suppllier nvarchar(255) not null,
	publisher nvarchar(255),
	author nvarchar(255),
	published_date datetime,
	page_count int,
	description nvarchar(max) not null,
	weight int  not null,
	[size] nvarchar(255)  not null,
	quantity int  not null,
	brand nvarchar(255),
	made_in nvarchar(255),
	origin nvarchar(255),
	color nvarchar(255),
	material nvarchar(255),
	category_id int not null,
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


INSERT INTO products (thumbnail_image, name, price, suppllier, publisher, author, published_date, page_count, description, weight, [size], quantity, brand, made_in, origin, color, material, category_id)
VALUES
    ('thumbnail_url_1.jpg', N'Tiền Khổ Sở Hữu', 15.99, N'Nhà Sách ABC', N'NXB Trẻ', N'Tác Giả A', '2023-05-15', 320, N'Đây là một cuốn sách tuyệt vời về tiểu thuyết', 300, N'20x15 cm', 100, N'ABC Brand', N'Việt Nam', N'Việt Nam', N'Đen', N'Giấy', 1),
    ('thumbnail_url_2.jpg', N'Phân Tích Tài Chính', 29.99, N'Sách Online XYZ', N'NXB Tài Chính', N'Tác Giả B', '2022-10-20', 450, N'Cuốn sách này cung cấp một cái nhìn sâu sắc vào phân tích tài chính.', 400, N'22x18 cm', 80, N'XYZ Brand', N'USA', N'China', N'Xám', N'Giấy', 2),
    ('thumbnail_url_3.jpg', N'Người Máy Số 1', 12.49, N'Sách Online XYZ', N'NXB Khoa Học', N'Tác Giả C', '2024-01-10', 280, N'Cuốn sách khoa học viễn tưởng đầy hấp dẫn', 350, N'21x17 cm', 120, N'XYZ Brand', N'USA', N'China', N'Xanh', N'Giấy', 3),
    ('thumbnail_url_4.jpg', N'Nhân Bản Tâm Hồn', 18.75, N'Nhà Sách ABC', N'NXB Tri Thức', N'Tác Giả D', '2023-09-28', 380, N'Sách tâm lý tuyệt vời để đọc và tìm hiểu', 320, N'20x15 cm', 90, N'ABC Brand', N'Việt Nam', N'Việt Nam', N'Đỏ', N'Giấy', 4),
    ('thumbnail_url_5.jpg', N'Đại Dương Vô Tận', 9.99, N'Nhà Sách XYZ', N'NXB Thanh Niên', N'Tác Giả E', '2022-12-05', 240, N'Thể loại phiêu lưu hấp dẫn cho mọi độc giả', 400, N'19x14 cm', 110, N'XYZ Brand', N'USA', N'China', N'Xanh Dương', N'Giấy', 5),
    ('thumbnail_url_6.jpg', N'Chân Lý Sống', 24.50, N'Sách Online XYZ', N'NXB Tri Thức', N'Tác Giả F', '2023-03-17', 420, N'Sách tự phát triển bản thân và kỹ năng sống', 380, N'22x16 cm', 75, N'XYZ Brand', N'USA', N'China', N'Vàng', N'Giấy', 6),
    ('thumbnail_url_7.jpg', N'Thế Giới Y Học', 36.00, N'Nhà Sách ABC', N'NXB Y Học', N'Tác Giả G', '2024-02-01', 550, N'Cuốn sách cung cấp kiến thức y học cơ bản và nâng cao', 450, N'24x18 cm', 60, N'ABC Brand', N'Việt Nam', N'Việt Nam', N'Trắng', N'Giấy', 7),
    ('thumbnail_url_8.jpg', N'Thiên Nhiên Kỳ Diệu', 14.99, N'Sách Online XYZ', N'NXB Thiên Nhiên', N'Tác Giả H', '2023-07-22', 300, N'Sách giáo dục về thiên nhiên cho trẻ em', 200, N'18x14 cm', 150, N'XYZ Brand', N'USA', N'China', N'Đỏ Cam', N'Giấy', 8),
    ('thumbnail_url_9.jpg', N'Trải Nghiệm Vũ Trụ', 28.75, N'Nhà Sách XYZ', N'NXB Khoa Học', N'Tác Giả I', '2022-11-11', 480, N'Khám phá vũ trụ với những thông tin thú vị', 380, N'23x17 cm', 85, N'XYZ Brand', N'USA', N'China', N'Đen', N'Giấy', 9),
    ('thumbnail_url_10.jpg', N'Câu Chuyện Cổ Tích', 8.50, N'Sách Online XYZ', N'NXB Trẻ', N'Tác Giả J', '2023-04-30', 220, N'Những câu chuyện cổ tích thú vị cho trẻ em', 150, N'16x12 cm', 120, N'XYZ Brand', N'USA', N'China', N'Màu Sắc Đa Dạng', N'Giấy', 10),
    ('thumbnail_url_11.jpg', N'Hành Trình Tìm Kiếm', 11.25, N'Nhà Sách ABC', N'NXB Tri Thức', N'Tác Giả K', '2023-08-12', 280, N'Sách phiêu lưu hấp dẫn với nhiều bí ẩn', 320, N'21x15 cm', 90, N'ABC Brand', N'Việt Nam', N'Việt Nam', N'Xám', N'Giấy', 5),
    ('thumbnail_url_12.jpg', N'Bí Mật Của Sức Mạnh', 19.99, N'Sách Online XYZ', N'NXB Phát Triển Bản Thân', N'Tác Giả L', '2022-09-20', 360, N'Sách phát triển bản thân để thành công', 400, N'20x16 cm', 80, N'XYZ Brand', N'USA', N'China', N'Đỏ', N'Giấy', 6),
    ('thumbnail_url_13.jpg', N'Hành Trình Của Người Thợ Săn', 8.99, N'Nhà Sách XYZ', N'NXB Thiếu Nhi', N'Tác Giả M', '2023-02-15', 200, N'Sách truyện thiếu nhi thú vị về cuộc phiêu lưu', 250, N'18x12 cm', 120, N'XYZ Brand', N'USA', N'China', N'Xanh', N'Giấy', 10),
    ('thumbnail_url_14.jpg', N'Thế Giới Động Vật', 29.50, N'Sách Online XYZ', N'NXB Môi Trường', N'Tác Giả N', '2024-03-30', 500, N'Sách học về thế giới động vật đa dạng', 450, N'24x18 cm', 60, N'XYZ Brand', N'USA', N'China', N'Xám', N'Giấy', 7),
    ('thumbnail_url_15.jpg', N'Sức Mạnh Của Lãnh Đạo', 17.75, N'Nhà Sách ABC', N'NXB Lãnh Đạo', N'Tác Giả O', '2023-06-28', 340, N'Sách lãnh đạo và quản lý hiệu quả', 300, N'22x16 cm', 90, N'ABC Brand', N'Việt Nam', N'Việt Nam', N'Xanh Lá', N'Giấy', 2),
    ('thumbnail_url_16.jpg', N'Phát Triển Trí Tuệ', 25.99, N'Sách Online XYZ', N'NXB Giáo Dục', N'Tác Giả P', '2022-10-05', 420, N'Sách giáo dục về phát triển trí tuệ', 380, N'23x17 cm', 75, N'XYZ Brand', N'USA', N'China', N'Xanh Dương', N'Giấy', 9),
    ('thumbnail_url_17.jpg', N'Kỹ Năng Sống Tích Cực', 12.00, N'Nhà Sách XYZ', N'NXB Phát Triển Bản Thân', N'Tác Giả Q', '2023-12-10', 290, N'Cuốn sách cung cấp kỹ năng sống tích cực', 280, N'20x15 cm', 110, N'XYZ Brand', N'USA', N'China', N'Vàng', N'Giấy', 3),
    ('thumbnail_url_18.jpg', N'Kỹ Thuật Làm Việc Hiệu Quả', 21.49, N'Sách Online XYZ', N'NXB Phát Triển Cá Nhân', N'Tác Giả R', '2024-01-20', 380, N'Sách hướng dẫn kỹ thuật làm việc hiệu quả', 350, N'21x16 cm', 100, N'XYZ Brand', N'USA', N'China', N'Đỏ Cam', N'Giấy', 8),
    ('thumbnail_url_19.jpg', N'Tiếng Chim Hót Trong Bão Tuyết', 13.75, N'Nhà Sách ABC', N'NXB Thiếu Nhi', N'Tác Giả S', '2023-03-25', 320, N'Truyện thiếu nhi đầy cảm xúc và ý nghĩa', 290, N'19x14 cm', 120, N'ABC Brand', N'Việt Nam', N'Việt Nam', N'Xanh Lá', N'Giấy', 10),
    ('thumbnail_url_20.jpg', N'Cách Tìm Kiếm Ý Nghĩa Cuộc Sống', 16.50, N'Sách Online XYZ', N'NXB Phát Triển Bản Thân', N'Tác Giả T', '2022-11-15', 350, N'Sách tâm lý về ý nghĩa cuộc sống', 320, N'22x17 cm', 90, N'XYZ Brand', N'USA', N'China', N'Màu Sắc Đa Dạng', N'Giấy', 4),
    ('thumbnail_url_21.jpg', N'Bí Ẩn của Vũ Trụ', 22.99, N'Nhà Sách ABC', N'NXB Khoa Học', N'Tác Giả U', '2023-11-10', 400, N'Sách khoa học về bí ẩn của vũ trụ', 380, N'23x17 cm', 80, N'ABC Brand', N'Việt Nam', N'Việt Nam', N'Xám', N'Giấy', 9),
    ('thumbnail_url_22.jpg', N'Cảm Hứng và Sáng Tạo', 18.25, N'Sách Online XYZ', N'NXB Phát Triển Bản Thân', N'Tác Giả V', '2022-12-30', 360, N'Sách khám phá cảm hứng và sáng tạo', 320, N'21x16 cm', 90, N'XYZ Brand', N'USA', N'China', N'Xanh Lá', N'Giấy', 6),
    ('thumbnail_url_23.jpg', N'Tiếng Đàn Bước Chân', 9.50, N'Nhà Sách XYZ', N'NXB Tri Thức', N'Tác Giả W', '2023-07-05', 240, N'Truyện tâm linh về sự sống và hy vọng', 280, N'19x14 cm', 100, N'XYZ Brand', N'USA', N'China', N'Vàng', N'Giấy', 10),
    ('thumbnail_url_24.jpg', N'Địa Lý Thế Giới', 28.99, N'Sách Online XYZ', N'NXB Giáo Dục', N'Tác Giả X', '2024-02-20', 500, N'Sách học về địa lý toàn cầu', 450, N'24x18 cm', 70, N'XYZ Brand', N'USA', N'China', N'Xanh Dương', N'Giấy', 7),
    ('thumbnail_url_25.jpg', N'Nghệ Thuật Sống Tích Cực', 14.75, N'Nhà Sách ABC', N'NXB Phát Triển Bản Thân', N'Tác Giả Y', '2023-09-15', 320, N'Cuốn sách hướng dẫn kỹ năng sống tích cực', 300, N'20x15 cm', 110, N'ABC Brand', N'Việt Nam', N'Việt Nam', N'Đỏ', N'Giấy', 3),
    ('thumbnail_url_26.jpg', N'Kinh Doanh Thành Công', 32.99, N'Sách Online XYZ', N'NXB Kinh Tế', N'Tác Giả Z', '2022-11-01', 450, N'Sách hướng dẫn kinh doanh hiệu quả', 400, N'22x16 cm', 80, N'XYZ Brand', N'USA', N'China', N'Xanh Lá', N'Giấy', 2),
    ('thumbnail_url_27.jpg', N'Thế Giới Kỳ Diệu của Những Cây Cỏ', 19.00, N'Nhà Sách XYZ', N'NXB Thiên Nhiên', N'Tác Giả A', '2023-04-12', 380, N'Sách giáo dục về thực vật và sinh vật', 350, N'21x16 cm', 90, N'XYZ Brand', N'USA', N'China', N'Xanh Lá', N'Giấy', 8),
    ('thumbnail_url_28.jpg', N'Trò Chơi Của Trí Tuệ', 26.50, N'Sách Online XYZ', N'NXB Giáo Dục', N'Tác Giả B', '2024-01-28', 420, N'Sách giáo dục về phát triển trí tuệ', 380, N'22x17 cm', 70, N'XYZ Brand', N'USA', N'China', N'Màu Sắc Đa Dạng', N'Giấy', 9),
    ('thumbnail_url_29.jpg', N'Khám Phá Thế Giới Động Vật', 14.99, N'Nhà Sách ABC', N'NXB Môi Trường', N'Tác Giả C', '2023-10-20', 300, N'Sách học về động vật và môi trường sống', 280, N'20x15 cm', 100, N'ABC Brand', N'Việt Nam', N'Việt Nam', N'Xám', N'Giấy', 7),
    ('thumbnail_url_30.jpg', N'Hành Trình Qua Thời Gian', 10.75, N'Sách Online XYZ', N'NXB Trẻ', N'Tác Giả D', '2022-12-05', 260, N'Truyện phiêu lưu vượt thời gian đầy kì bí', 240, N'19x14 cm', 120, N'XYZ Brand', N'USA', N'China', N'Đỏ Cam', N'Giấy', 5);

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
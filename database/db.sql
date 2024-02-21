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
	name nvarchar(255) not null unique,
	price decimal(20,2) not null,
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
INSERT INTO items ([name]) VALUES (N'Sách Tiếng Việt');
INSERT INTO items ([name]) VALUES (N'English Books');
INSERT INTO items ([name]) VALUES (N'Quà Lưu Niệm');
--dữ liệu mẫu categories
INSERT INTO categories ([name], item_id) 
VALUES  (N'Art & Photography', 3),
		(N'Biographies & Memoirs', 3),
		(N'Business & Economics', 3),
		(N'How-to - Self Help', 3),
		(N'Children Books', 3),
		(N'Dictionary', 3),
		(N'Education - Teaching', 3),
		(N'Fiction - Literature', 3),
		(N'Magazines', 3),
		(N'Medical Books', 3),
		(N'Parenting & Relationships', 3),
		(N'Refence', 3),
		(N'Science - Technology', 3),
		(N'History, Politics & Socail Sciences', 3),
		(N'Travel & Holiday', 3),
		(N'Cookbooks, Food & Wine', 3),
		(N'Sách văn học', 2),
		(N'Sách kinh tế', 2),
		(N'Sách thiếu nhi', 2),
		(N'Sách kỹ năng sống', 2),
		(N'Sách Bà mẹ - Em bé', 2),
		(N'Sách Giáo Khoa - Giáo Trình', 2),
		(N'Sách Học Ngoại Ngữ', 2),
		(N'Sách Tham Khảo', 2),
		(N'Từ Điển', 2),
		(N'Sách Kiến Thức Tổng Hợp', 2),
		(N'Sách Khoa Học - Kỹ Thuật', 2),
		(N'Sách Lịch Sử', 2),
		(N'Điện Ảnh - Nhạc - Hoạ', 2),
		(N'Truyện Tranh, Manga, Comic', 2),
		(N'Sách Tôn Giáo - Tâm Linh', 2),
		(N'Sách Văn Hoá - Địa Lý - Du Lịch', 2),
		(N'Sách Chính Trị - Pháp Lý', 2),
		(N'Sách Nông - Lâm - Ngư Nghiệp', 2),
		(N'Sách Công Nghệ Thông Tin',2),
		(N'Sách Y Học',2),
		(N'Tạp Chí - Catalogue',2),
		(N'Sách Tâm Lý - Giới tính',2),
		(N'Sách Thường Thức - Gia Đình',2),
		(N'Thể Dục - Thể Thao',2),
		(N'1980Books',2),
		(N'Dụng Cụ Văn Phòng',1),
		(N'Bút - Viết các loại',1),
		(N'Bút Chì Màu - Bút Lông Màu - Sáp Màu',1),
		(N'Dụng Cụ Học Sinh',1),
		(N'Flashcards',1),
		(N'Sổ Tay Các Loại',1),
		(N'Tập Vở Các Loại',1),
		(N'Văn Hoá Phẩm',1),
		(N'Thiết Bị Giáo Dục Trường Học',1),
		(N'Balo Học Sinh - Cặp Học Sinh',1),
		(N'Máy Tính Điện Tử',1),
		(N'Lịch',1),
		(N'Bút Kỹ Thuật',1),
		(N'Sản Phẩm Về Giấy',1),
		(N'Thiết Bị Văn Phòng',1),
		(N'Thú Nhồi Bông',4),
		(N'Bookmark',4),
		(N'Thiệp - Bưu Ảnh',4),
		(N'Quà Tặng Trang Sức',4),
		(N'Album - Khung Hình',4),
		(N'Mô Hình Trang Trí',4),
		(N'Sticker - Decal Trang Trí',4),
		(N'Ly -	Cốc',4),
		(N'Kẹp Ảnh Gỗ',4),
		(N'Hộp Quà - Túi Quà',4),
		(N'Tượng',4),
		(N'Móc Khoá - Phụ Kiện Trang Trí',4),
		(N'Đồng Hồ Cát',4),
		(N'Quả Cầu Tuyết',4),
		(N'Hộp Nhạc',4),
		(N'Phụ Kiện - Vật Liệu Trang Trí',4),
		(N'Quà Tặng Trang Trí Khác',4),
		(N'Gương Mini',4)

insert into products
values  ('artbook-sachtienganh-domus1950-1959.jpg.webp',N'Artbook - Sách Tiếng Anh - domus 1950–1959',1040000,'ARTBook','Taschen'
		,'Charlotte & Peter Fiell','06-02-2023',639,N'domus 1950–1959 is a book about domus magazine in the 1950s, a period marked by 
		turmoil due to World War II. This book records the trends and developments of design in the context of crisis and reconstruction. 
		This book also presents the works and designers that were significant, such as modern furniture and prefabricated houses,
		American academic architecture, Carlo Mollino, Gian Luigi Banfi, Franco Albini and Giuseppe Terragni','','',8,'','','','','',1)


		
		
	

select * from items
select * from categories
select * from products


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


INSERT INTO accounts VALUES
('mary_johnson', '123', 'mary.johnson@example.com', 'Mary', 'Johnson', '987 Cedar Street, City F'),
('peter_williams', '123', 'peter.williams@example.com', 'Peter', 'Williams', '654 Birch Street, City G'),
('susan_anderson', '123', 'susan.anderson@example.com', 'Susan', 'Anderson', '321 Oakwood Street, City H'),
('michael_thomas', '123', 'michael.thomas@example.com', 'Michael', 'Thomas', '852 Pineview Drive, City I'),
('laura_miller', '123', 'laura.miller@example.com', 'Laura', 'Miller', '147 Willow Lane, City J'),
('david_taylor', '123', 'david.taylor@example.com', 'David', 'Taylor', '369 Elm Avenue, City K'),
('linda_wilson', '123', 'linda.wilson@example.com', 'Linda', 'Wilson', '753 Maple Road, City L'),
('james_martin', '123', 'james.martin@example.com', 'James', 'Martin', '258 Cedar Avenue, City M'),
('sarah_andrews', '123', 'sarah.andrews@example.com', 'Sarah', 'Andrews', '741 Pine Street, City N'),
('steven_clark', '123', 'steven.clark@example.com', 'Steven', 'Clark', '963 Elm Street, City O');

INSERT INTO accounts VALUES
('john_doe', '123', 'john.doe@example.com', 'John', 'Doe', '123 Main Street, City A'),
('jane_smith', '123', 'jane.smith@example.com', 'Jane', 'Smith', '456 Elm Street, City B'),
('mike_wilson', '123', 'mike.wilson@example.com', 'Mike', 'Wilson', '789 Oak Street, City C'),
('emily_brown', '123', 'emily.brown@example.com', 'Emily', 'Brown', '321 Pine Street, City D'),
('alexander_jones', '123', 'alexander.jones@example.com', 'Alexander', 'Jones', '654 Maple Street, City E');


insert into products values ('artbook-sachtienganh-domus1950-1959.jpg.webp',N'Artbook - Sách Tiếng Anh - domus 1950–1959',1040000,'ARTBook','Taschen','Charlotte & Peter Fiell','06-02-2023',639,N'domus 1950–1959 is a book about domus magazine in the 1950s, a period marked by turmoil due to World War II. This book records the trends and developments of design in the context of crisis and reconstruction. This book also presents the works and designers that were significant, such as modern furniture and prefabricated houses,American academic architecture, Carlo Mollino, Gian Luigi Banfi, Franco Albini and Giuseppe Terragni','','',8,'','','','','',1);
insert into products values	('artbook-sachtienganh-domus1970-1979.jpg.webp',N'Artbook - Sách Tiếng Anh - domus 1970–1979',1040000,'ARTBook','Taschen','Charlotte & Peter Fiell','06-02-2023',639,N'domus 1970–1979 is a book about domus magazine, a famous Italian architecture and design magazine, in the 1970s. This book collects the most important articles on the themes and styles in industrial, interior, product, and architectural design. This book also introduces the projects and designers that stood out, such as Shiro Kuramata, Verner Panton, Joe Colombo, Richard Meier, Foster Associates and Renzo Piano','','',8,'','','','','',1);
insert into products values	('artbook-sachtienganh-domus1940-1949.jpg.webp',N'Artbook - Sách Tiếng Anh - domus 1940–1949',1040000,'ARTBook','Taschen','Charlotte & Peter Fiell','06-02-2023',639,N'domus 1940–1949 is a book about domus magazine in the 1940s, a period marked by turmoil due to World War II. This book records the trends and developments of design in the context of crisis and reconstruction. This book also presents the works and designers that were significant, such as modern furniture and prefabricated houses, American academic architecture, Carlo Mollino, Gian Luigi Banfi, Franco Albini and Giuseppe Terragni','','',8,'','','','','',1);
insert into products values	('aroundtheworldin80festivalsjpg.webp',N'Around The World In 80 Festivals',299000,'Welbeck Publishing Group','Welbeck Publishing Group','Nancy Dickmann','11-15-2022',72,N'moWhen do you eat bread of the dead, or walk barefoot across red-hot coals? When might you dress up as a demon in a hairy suit and huge horned headdress? What are you celebrating if you climb an 18-metre-high tower made out of buns?Includes a stunning central gatefold that opens out to reveal a calendar of all the festivals featured in the book. This is a visual celebration of festivals from across the globe, from the more familiar to those you might never have heard of before. Discover more about Junkanoo in the Bahamas, Juneteenth in the United States, Matariki in New Zealand and Polands Great Dragon Parade. As you journey around the world, explore celebrations of food and drink, nature, culture, religion and history, plus ways to mark the passing of the year.','','',8,'','','','','',1);
insert into products values	('ABeginnersGuide oColoredPencilDrawing.jpg.webp',N'A Beginners Guide To Colored Pencil Drawing',469000,'Tuttle Publishing','Tuttle Publishing','堀越 耕平','06-20-2023',128,N'Learn to create vividly realistic colored pencil drawings in just a few lessons!

A Beginners Guide to Colored Pencil Drawing provides instructions for creating brilliantly realistic drawings featuring rich shadows, bright highlights, smooth gradients, and glowing colors. Learn at your own pace over the course of 14 easy-to-follow lessons!

This complete all-in-one guide starts with the basics--drawing lines, adding colors, drawing shapes and creating gradations. Then, it provides a series of detailed lessons teaching you how to draw colorful, everyday objects, such as:

Food items like burgers, breakfasts, cookies, pickles, tarts, melons, apples, asparagus and cocktails
Flowers & plants such as hydrangeas, succulents, roses and carnations
Household items like silverware, bottles, toys, handkerchiefs, gemstones and dolls
A variety of animals including parakeets, kittens and dogs

Each lesson includes blank sketch of the subject so you can focus on coloring techniques, and Faber-Castell color codes are provided so you can faithfully reproduce the example illustrations. Each lesson also includes a tear-out practice sheet with the full sketch so you can dive right in and try your hand at rendering these objects yourself! The practice template sheets are also available online to download and print at home.

This book has everything you need to master a dynamic art that is affordable and satisfying. Take the 14 lessons in 14 days, like a crash course in colored pencil mastery--or take your time. Colored pencils are a favorite medium of hobbyists and increasingly embraced by fine artists as well!','','',8,'','','','','',1);
insert into products values	('DrawAmazingMangaCharacters.webp',N'Draw Amazing Manga Characters',429000,'Tuttle Publishing','Tuttle Publishing','堀越 耕平','11-08-2022',224,N'Draw Amazing Manga Characters combines the strengths, talents, and perspectives of five different manga artists over 81 lessons that increase in detail and complexity. Key building blocks allow you to progress as you move through the book and "Take a Closer Look" sidebars offer tips so developing artists can avoid frustrating obstacles and roadblocks.

This essential handbook shows you how to:

Draw action characters from every possible angle, perspective, and viewpoint
Progress logically from concept to character and from sketch to finished drawing
Create well-balanced and proportioned characters to tell your story
Create scenes with real depth and three-dimensional appeal

The illustrators guide you through an easy four-step figure drawing process:
1. Block-in the basic shapes, using the techniques of figure drawing to set down the rough outline of your character
2. Sketch in the formal details, as your creation starts to take on form and shape
3. Now it s time to lay down the next layers of features and tweaks that will make your character come to life
4. Finally the finishing touches, the shading and nuances that add depth, complexity and three-dimensional appeal…Now look whats sprung to life on the page--your very own manga character!','','',8,'','','','','',1);
insert into products values	('Anime&MangaDigitalColoring Guide.webp',N'Anime & Manga Digital Coloring Guide',469000,'Tuttle Publishing','Tuttle Publishing','堀越 耕平','07-03-2023',192,N'mota','','',8,'','','','','',1);
insert into products values	('HowToDoodleTheCompleteGuide.webp',N'How To Doodle: The Complete Guide',449000,'Tuttle Publishing','Tuttle Publishing','','07-03-2023',224,N'Sweet and simple drawings for creative fun!

In this whimsical new guide, Japanese illustrator and master doodler KAMO shows you how to draw the cutest sketches you"ve ever seen. And she makes drawing them so easy!

Start with a squiggle, a circle or a line, then add a few strokes and voila--your drawing is done! She includes hundreds of examples and shows you how to use them to decorate your sketchbook, journal, notebook, gift cards, school projects and many other items.

Learn to draw items such as:

Interesting people from all walks of life, plus adorable pets and flowers
Delicious meals or the perfect outfit and the living spaces around you
Local buildings or mementos of your travels
Custom lettering for one-of-a-kind correspondence
Decorative border motifs for your journals and sketchpads
And so much more!

Discover how fun it is to draw cartoon-style animals, plants, people, food and more--everything your heart desires. It is all in this book!','','',8,'','','','','',1);
insert into products values	('SketchingMenHowToDrawLifelikeMaleFiguresAComplete CourseForBeginners.webp',N'Sketching Men: How To Draw Lifelike Male Figures, A Complete Course For Beginners',479000,'Tuttle Publishing','Tuttle Publishing','堀越 耕平','08-12-2020',176,N'In Sketching Men, veteran art instructor Koichi Hagawa, PhD explains how to quickly capture the dynamic male form through two distinct styles of sketching:

Very rapid (1-3 minute) line drawings that capture the essence of the subject"s posture and movement--perfect for recording athletic action poses in the moment
More finished tonal drawings, which take a bit longer to render (7-10 minutes), but fill in lots of interesting texture and wonderfully realistic details and nuances, including the play of light and shadow, three-dimensional form and a sense of mass and balance
Learn to sketch the following:

Individual body parts and their bones and muscles
Objects held in the hands and with both arms
Standing and sitting poses
Transitions from prone and sitting poses to a standing pose
Bending, reaching and leaning poses
Pushing, throwing and dancing poses
Folds, gathers and drape of clothing
+
This book contains hundreds of detailed studies and helpful examples. Your sketches will improve rapidly as you learn all about how human anatomy--the skeleton, muscles and posture--all come together to express the uniquely male form. When you hone your line and tonal drawing skills with this book, all of your artwork will improve as a result, no matter the application: storyboarding, cartooning and graphic novels, illustration, formal drawings, painting and more!','','',8,'','','','','',1);
insert into products values	('AGuideToDrawingMangaFantasyFurries.webp',N'A Guide To Drawing Manga Fantasy Furries',469000,'Tuttle Publishing','Tuttle Publishing','堀越 耕平','04-25-2023',144,N'Part human, part animal -- all fantastic!

Veteran illustrator Ryo Sumiyoshi stretches the boundaries of fantasy human-animal hybrids in his new book--presenting not just the usual jungle beasties but a fascinating array of strange and unusual creatures found nowhere else! Sumiyoshi"s extensive sketchbook ideas, drawing tips and full-color examples combine insights on body structures and movement with conceptual sketches and notes linking physical attributes to personality and behavior.

The hundreds of drawings in this book show you how to create a rich menagerie of fantasy characters:

Anthropomorphic furries based on the classic dog, cat, fox and werewolf-type characters
Humans with animal features like a hunter with a bushy tail and the crafty face of a cat
Animals with human features, for example a six-legged tiger with a human face
Animal-to-animal hybrids including a snake-fox and a griffinesque chimera

These creatures boast mix-and-match fangs, beaks, paws, claws, fur, fins, feathers, scales and plates paired with expressive human attributes. And they come from every branch of the animal kingdom--from mammals to birds, reptiles, fish and insects--and everything in between.','','',8,'','','','','',1);
insert into products values	('caycamngotcuatoi.webp',N'Cây Cam Ngọt Của Tôi',108000,'Nhã Nam',N'Nhà Xuất Bản Hội Nhà Văn','José Mauro de Vasconcelos','',244,N'“Vị chua chát của cái nghèo hòa trộn với vị ngọt ngào khi khám phá ra những điều khiến cuộc đời này đáng số một tác phẩm kinh điển của Brazil.”

- Booklist

“Một cách nhìn cuộc sống gần như hoàn chỉnh từ con mắt trẻ thơ… có sức mạnh sưởi ấm và làm tan nát cõi lòng, dù người đọc ở lứa tuổi nào.”

- The National

Hãy làm quen với Zezé, cậu bé tinh nghịch siêu hạng đồng thời cũng đáng yêu bậc nhất, với ước mơ lớn lên trở thành nhà thơ cổ thắt nơ bướm. Chẳng phải ai cũng công nhận khoản “đáng yêu” kia đâu nhé. Bởi vì, ở cái xóm ngoại ô nghèo ấy, nỗi khắc khổ bủa vây đã che mờ mắt người ta trước trái tim thiện lương cùng trí tưởng tượng tuyệt vời của cậu bé con năm tuổi.

Có hề gì đâu bao nhiêu là hắt hủi, đánh mắng, vì Zezé đã có một người bạn đặc biệt để trút nỗi lòng: cây cam ngọt nơi vườn sau. Và cả một người bạn nữa, bằng xương bằng thịt, một ngày kia xuất hiện, cho cậu bé nhạy cảm khôn sớm biết thế nào là trìu mến, thế nào là nỗi đau, và mãi mãi thay đổi cuộc đời cậu.
Mở đầu bằng những thanh âm trong sáng và kết thúc lắng lại trong những nốt trầm hoài niệm, Cây cam ngọt của tôi khiến ta nhận ra vẻ đẹp thực sự của cuộc sống đến từ những điều giản dị như bông hoa trắng của cái cây sau nhà, và rằng cuộc đời thật khốn khổ nếu thiếu đi lòng yêu thương và niềm trắc ẩn. Cuốn sách kinh điển này bởi thế không ngừng khiến trái tim người đọc khắp thế giới thổn thức, kể từ khi ra mắt lần đầu năm 1968 tại Brazil.

Tác giả:

JOSÉ MAURO DE VASCONCELOS (1920-1984) là nhà văn người Brazil. Sinh ra trong một gia đình nghèo ở ngoại ô Rio de Janeiro, lớn lên ông phải làm đủ nghề để kiếm sống. Nhưng với tài kể chuyện thiên bẩm, trí nhớ phi thường, trí tưởng tượng tuyệt vời cùng vốn sống phong phú, José cảm thấy trong mình thôi thúc phải trở thành nhà văn nên đã bắt đầu sáng tác năm 22 tuổi. Tác phẩm nổi tiếng nhất của ông là tiểu thuyết mang màu sắc tự truyện Cây cam ngọt của tôi. Cuốn sách được đưa vào chương trình tiểu học của Brazil, được bán bản quyền cho hai mươi quốc gia và chuyển thể thành phim điện ảnh. Ngoài ra, José còn rất thành công trong vai trò diễn viên điện ảnh và biên kịch.','','',8,'','','','','',2);
insert into products values	('nhungngatuvanhungcotden.webp',N'Những Ngã Tư Và Những Cột Đèn',176500,'Nhã Nam',N'Nhà Xuất Bản Hội Nhà Văn',N'Trần Dần','05-20-2022',376,N'Tôi qua ngã tư Cửa Nam. Ngã tư Cửa Nam đầy khói. Để không thể đếm bao nhiêu nốt chân trên ngã tư. Ai đếm bao nhiêu nốt chân khôn dại. Bao nhiêu nốt chân vui buồn? Ai đếm những ngã tư đời láo nháo nốt chân. Láo nháo cột đèn láo nháo đèn? Đời tôi đã rẽ rồi. Như đã hạ nước cờ không sao đi lại được. Nhưng tại sao tôi cứ ám ảnh: cái ngã tư tại sao ấy. Tôi quên không được. Đi đi không được. Tôi ngồi bệt lề đường. Tôi là đàn ông: tôi không đau khổ. Nhưng tôi muốn khóc. Tôi là đàn ông: Tôi không khóc. Nhưng tôi đau khổ lắm. Tôi ngồi bệt mà nhìn láo nháo cột đèn. Láo nháo khói. Láo nháo hàng cây bên đường lá rụng. Tôi nghe gà gáy te te nội thành. Chỗ tôi ngồi không xa có vườn hoa Canh Nông. Tôi lảo đảo dậy: tôi đi tìm vườn hoa Canh Nông. Tôi vào vườn hoa. Tôi ngồi ghế đá. Ghế đá lạnh. Gà gáy te te. Phố bắt đầu mất khói. Vườn hoa cũng bắt đầu hết khói. Là rạng đông rồi. Tôi không mệt. Buồn ngủ cũng không. Tôi đã nói rồi: tôi đi thấu sáng. Bây giờ tôi ngồi. Cùng với rạng đông. Trong một vườn hoa.','','',8,'','','','','',2),
		('noinhuc.webp',N'Nỗi nhục (Nobel Prize in Literature 2022)',58800,'Nhã Nam',N'Nhà Xuất Bản Phụ Nữ','Annie Ernaux','',109,N'Giữa những năm chín mươi, Annie Ernaux đưa độc giả trở lại mùa hè năm 1952, cái mùa hè xảy ra một sự kiện khiến cô thiếu nữ khi ấy bắt đầu cảm thấy một nỗi nhục, về cha mẹ mình, về nghề nghiệp và môi trường sống của họ.

“Bố tôi đã định giết mẹ tôi vào đầu buổi chiều một Chủ nhật tháng Sáu.”

Đan xen giữa hồi ức và những suy tư về chuyện viết lách, Annie Ernaux đưa tới độc giả một lời chứng thật đẹp về mùa hè đã thay đổi cuộc đời mình, khi cô thiếu nữ bắt đầu ý thức được ánh mắt người khác đối với xuất thân của mình và khi cái nhìn của chính cô về cha mẹ mình cũng đã thay đổi.

Như mọi cuốn sách của Annie Ernaux, Nỗi nhục, xuất bản tại Pháp năm 1997, được viết nên bằng rất nhiều nỗi ngượng ngùng, nhưng cũng rất nhiều sự thật.

“Suốt 50 năm qua, Annie Ernaux viết cuốn tiểu thuyết về ký ức tập thể và riêng tư của đất nước chúng ta. Tiếng nói của bà là tiếng nói của tự do của người phụ nữ và của những điều đã bị lãng quên trong thế kỷ qua.”

- Tổng thống Pháp Emmanuel Macron

Annie Ernaux sinh năm 1940 tại Lillebonne, lớn lên tại Yvetot, đều thuộc tỉnh Seine-Maritime, vùng Normandie, tây bắc nước Pháp. Bà học ngành Văn học hiện đại ở đại học Rouen, sau đó làm giáo viên văn ở Annecy, Pontoise rồi Trung tâm giáo dục từ xa quốc gia. Bà là tiến sĩ danh dự của đại học Cergy-Pontoise.

Năm 1974, bà xuất bản tác phẩm đầu tay Les armoires vides (Những ngăn kéo rỗng) kể về lần phá thai chui của bản thân vào năm 1964. Năm 1983, bà xuất bản Một chỗ trong đời, kể về cuộc đời của cha mình, và cuốn sách đã đoạt giải Renaudot. Năm 2008, bà xuất bản Les années (Những năm tháng), tác phẩm được coi là sự hoàn chỉnh về nội dung lẫn hình thức của thể loại hồi ức tập thể.

Trong suốt sự nghiệp, Annie Ernaux đã được trao rất nhiều giải thưởng: giải Renaudot (1984), giải thưởng về ngôn ngữ Pháp, giải François Mauriac (2008), giải Marguerite Youcenar (2017)… và đặc biệt, giải Nobel Văn chương (2022) vì “với lòng can đảm cùng sự nhạy bén bên trong, bà đã khám phá ra những cội rễ, những cách biệt và những câu thúc tập thể của hồi ức cá nhân”.

Bà hiện sống ở Cergy, vùng Île-de-France.','','',8,'','','','','',2),
		('motnguoiphunu.webp',N'Một người phụ nữ (Nobel Prize in Literature 2022)',58800,'Nhã Nam',N'Nhà Xuất Bản Phụ Nữ','Annie Ernaux','04-01-2023',109,N'“Tôi sẽ không còn nghe thấy giọng nói của bà nữa. […] Tôi đã đánh mất sợi dây nối cuối cùng với thế giới xuất thân của mình.”
Ấy là cảm giác của Annie Ernaux khi thực sự nhận ra mẹ mình không còn trên cõi đời. Và bà gắng đi tìm lại những gương mặt khác nhau của người mẹ ấy, một người phụ nữ vốn rất khỏe, xông xáo, cởi mở, qua đời ngày 7 tháng Tư năm 1986, sau một thời gian mắc bệnh Alzeimer. Qua sự tái hiện cuộc đời một nữ công nhân, rồi chủ hàng thực phẩm luôn lo âu về địa vị và học hỏi không ngừng, Annie Ernaux cũng cho ta thấy sự tiến triển cũng như tính hai mặt của những tình cảm mà một người con gái dành cho mẹ: tình yêu, lòng thù ghét, sự âu yếm, cảm giác tội lỗi và cuối cùng là sự gắn bó máu thịt với người đàn bà già cả đã sa sút trí tuệ. Cùng với đó phảng phất những thăng trầm của nước Pháp suốt thế kỷ 20, giống như lời tổng thống Pháp Emmanuel Macron đã phát biểu khi Annie Ernaux trở thành chủ nhân giải Nobel Văn chương 2022:

“Suốt 50 năm qua, Annie Ernaux viết cuốn tiểu thuyết về ký ức tập thể và riêng tư của đất nước chúng ta. Tiếng nói của bà là tiếng nói của tự do của người phụ nữ và của những điều đã bị lãng quên trong thế kỷ qua.”

Annie Ernaux sinh năm 1940 tại Lillebonne, lớn lên tại Yvetot, đều thuộc tỉnh Seine-Maritime, vùng Normandie, tây bắc nước Pháp. Bà học ngành Văn học hiện đại ở đại học Rouen, sau đó làm giáo viên văn ở Annecy, Pontoise rồi Trung tâm giáo dục từ xa quốc gia. Bà là tiến sĩ danh dự của đại học Cergy-Pontoise.

Năm 1974, bà xuất bản tác phẩm đầu tay Les armoires vides (Những ngăn kéo rỗng) kể về lần phá thai chui của bản thân vào năm 1964. Năm 1983, bà xuất bản Một chỗ trong đời, kể về cuộc đời của cha mình, và cuốn sách đã đoạt giải Renaudot. Năm 2008, bà xuất bản Les années (Những năm tháng), tác phẩm được coi là hoàn chỉnh cả về nội dung lẫn hình thức của thể loại hồi ức tập thể.

Trong suốt sự nghiệp, Annie Ernaux đã được trao rất nhiều giải thưởng: giải Renaudot (1984), giải thưởng về ngôn ngữ Pháp, giải François Mauriac (2008), giải Marguerite Youcenar (2017)… và đặc biệt, giải Nobel Văn chương (2022) vì “với lòng can đảm cùng sự nhạy bén bên trong, bà đã khám phá ra những cội rễ, những cách biệt và những câu thúc tập thể của hồi ức cá nhân”.','','',8,'','','','','',2),
		('nhagiakim.webp',N'Nhà Giả Kim (Tái Bản 2020)',61100,'Nhã Nam',N'Nhà Xuất Bản Hà Nội','Paulo Coelho','04-01-2023',228,N'Sơ lược về tác phẩm

Tất cả những trải nghiệm trong chuyến phiêu du theo đuổi vận mệnh của mình đã giúp Santiago thấu hiểu được ý nghĩa sâu xa nhất của hạnh phúc, hòa hợp với vũ trụ và con người.

Tiểu thuyết Nhà giả kim của Paulo Coelho như một câu chuyện cổ tích giản dị, nhân ái, giàu chất thơ, thấm đẫm những minh triết huyền bí của phương Đông. Trong lần xuất bản đầu tiên tại Brazil vào năm 1988, sách chỉ bán được 900 bản. Nhưng, với số phận đặc biệt của cuốn sách dành cho toàn nhân loại, vượt ra ngoài biên giới quốc gia, Nhà giả kim đã làm rung động hàng triệu tâm hồn, trở thành một trong những cuốn sách bán chạy nhất mọi thời đại, và có thể làm thay đổi cuộc đời người đọc.

“Nhưng nhà luyện kim đan không quan tâm mấy đến những điều ấy. Ông đã từng thấy nhiều người đến rồi đi, trong khi ốc đảo và sa mạc vẫn là ốc đảo và sa mạc. Ông đã thấy vua chúa và kẻ ăn xin đi qua biển cát này, cái biển cát thường xuyên thay hình đổi dạng vì gió thổi nhưng vẫn mãi mãi là biển cát mà ông đã biết từ thuở nhỏ. Tuy vậy, tự đáy lòng mình, ông không thể không cảm thấy vui trước hạnh phúc của mỗi người lữ khách, sau bao ngày chỉ có cát vàng với trời xanh nay được thấy chà là xanh tươi hiện ra trước mắt. ‘Có thể Thượng đế tạo ra sa mạc chỉ để cho con người biết quý trọng cây chà là,’ ông nghĩ.”

- Trích Nhà giả kim

Nhận định

“Sau Garcia Márquez, đây là nhà văn Mỹ Latinh được đọc nhiều nhất thế giới.”

- The Economist, London, Anh

“Santiago có khả năng cảm nhận bằng trái tim như Hoàng tử bé của Saint-Exupéry.”

- Frankfurter Allgemeine Zeitung, Đức','','',8,'','','','','',2),
		('sukyyfpt35nam.webp',N'SỬ KÝ FPT 35 NĂM - Từ tay trắng đến tập đoàn toàn cầu',350000,N'CÔNG TY CỔ PHẦN RIO BOOK VIỆT NAM',N'Nhà Xuất Bản Dân Trí','FPT','01-01-2024',392,N'rên hành trình 35 năm gây dựng và phát triển, từ không vốn liếng, không kinh nghiệm, bạn có tò mò liệu FPT đã làm những gì để vươn lên trở thành tập đoàn công nghệ tư nhân lớn nhất Việt Nam? Cuốn sách này sẽ cho bạn một phác họa chân thực về con đường gian nan mà FPT đã trải qua.

“SỬ KÝ FPT 35 NĂM - Từ tay trắng đến tập đoàn toàn cầu” không phải là cuốn sách dạy về kinh doanh hay quản trị. Đây là một cuốn sử ký với những câu chuyện, sự kiện lịch sử được chắt lọc từ những gì các nhà sáng lập, nhà lãnh đạo, quản lý và cán bộ nhân viên FPT nhiều thế hệ đã trải qua trong suốt hành trình lập nghiệp và kiến tạo FPT từ tay trắng trở thành tập đoàn toàn cầu.

Bạn đọc có thể tìm thấy trong cuốn sách nhiều bài học thực tiễn về việc xây dựng mô hình và tổ chức hoạt động của một công ty từ khởi nghiệp với con số 0 ở Việt Nam đến khi trở thành tập đoàn hùng mạnh hàng chục nghìn người trên toàn cầu, từ công tác định hướng chiến lược, lập kế hoạch, tuyển dụng và đào tạo, tiếp thị và bán hàng, nghiên cứu và phát triển, xây dựng môi trường văn hóa doanh nghiệp… Và giá trị của những bài học này vượt ra ngoài phạm vi lịch sử của FPT.

Cuốn sách “SỬ KÝ FPT 35 NĂM - Từ tay trắng đến tập đoàn toàn cầu” được chia thành năm chương và một phần mở rộng:

Chương - Sự hình thành tổ chức kiểu mới: 13 nhà khoa học trẻ của Việt Nam đã làm cách nào để hình thành FPT trong bối cảnh đất nước bắt đầu bước vào thời kỳ đổi mới?

Chương - Từ 0 đến Sống: Những cách mà các nhà sáng lập FPT đã làm để giúp công ty sống, tồn tại trong thời kỳ đầu khi không có vốn liếng trong tay

Chương - Vươn lên cùng Việt Nam
Hành trình tiên phong khai phá những lĩnh vực mới của FPT như tin học hóa quốc gia, mở đường Internet, phân phối bán lẻ hàng chính hãng, mở đại học đầu tiên trong lòng doanh nghiệp và tự chủ giáo dục…
Những tham vọng không thành và bài học kinh nghiệm để đời khi đầu tư ngoài ngành như bất động sản, ngân hàng, tài chính, game online…
Quá trình chuyển đổi để trở thành tập đoàn; Cách thức chia cổ phần và quản trị khi trở thành công ty đại chúng…
Cách thức và hành động của FPT trong song hành cùng các doanh nghiệp Việt Nam vươn lên: tiên phong chuyển đổi số, thúc đẩy phong trào khởi nghiệp quốc gia, đứng ra giải quyết bài toán lớn của quốc gia…

Chương - Trở thành tập đoàn toàn cầu

Con đường FPT đi ra toàn cầu với những quyết định chiến lược quan trọng, những vấp ngã và bài học kinh nghiệm

Cách FPT thực hiện những thương vụ M&A đình đám tại nước ngoài

Bí kíp “săn cá voi” kiếm những hợp đồng trăm triệu USD; những trận đánh lớn đẳng cấp toàn cầu…

Chinh phục cột mốc tỷ USD và những định hướng tiếp theo trên con đường toàn cầu hóa

Chương - Công thức FPT: Những điểm chính yếu đóng vai trò quan trọng tạo nên sự thành công của FPT

️ Mở rộng - Việt Nam AI: Cơ hội cho tương lai của Việt Nam và định hướng chiến lược của FPT trong kỷ nguyên AI

Thông qua cuốn sách, FPT muốn đưa trải nghiệm lịch sử quý giá này đến với các lãnh đạo doanh nghiệp Việt Nam, những con người mong muốn bằng bàn tay, khối óc của mình làm nên những kỳ tích, để nuôi niềm tin, để có thêm muôn vàn trải nghiệm khác, thành công khác. Đó là sự chung sức đưa dân tộc trở thành một Việt Nam hùng cường.

Xin chào đón một cuốn sách mới, bổ ích cho FPT và cho cộng đồng doanh nghiệp Việt.

"Bạn có thể tìm thấy trong cuốn sách nhiều bài học thực tiễn về việc xây dựng mô hình và tổ chức hoạt động của một công ty từ khởi nghiệp với con số 0 ở Việt Nam đến khi trở thành tập đoàn hùng mạnh hàng chục nghìn người trên toàn cầu, từ công tác định hướng chiến lược, lập kế hoạch, tuyển dụng và đào tạo, tiếp thị và bán hàng, nghiên cứu và phát triển, xây dựng môi trường văn hoá doanh nghiệp... Và giá trị của những bài học này vượt ra ngoài phạm vi lịch sử của FPT".
Tiến sĩ  MAI LIÊM TRỰC
Nguyên Thứ trưởng thường trực Bộ Bưu chính Viễn thông
(nay là Bộ Thông tin và Truyền thông)
 
"Từ không vốn liếng, không kinh nghiệm, chúng tôi đưa FPT vươn lên trở thành một tập đoàn toàn cầu. Đó là một trải nghiệm rất Việt Nam. Và chúng tôi muốn đưa trải nghiệm ấy đến với cộng đồng thông qua cuốn sách này, như một sự đền đáp, chia sẻ với lớp lớp thế hệ thanh niên Việt Nam, những con người mong muốn bằng bàn tay, khối óc của mình làm nên những kỳ tích."
Ông  TRƯƠNG GIA BÌNH
Nhà sáng lập, Chủ tịch HĐQT FPT
 
"Tôi đánh giá cao kinh nghiệm của FPT trong việc xây dựng một tập đoàn CNTT-VT lớn mạnh như ngày nay, liên tục đổi mới sáng tạo, có mặt và cạnh tranh thành công tại các quốc gia phát triển nhất. Cuốn sách này rất đáng đọc."
Ông  Hồ Hùng Anh
Chủ tịch HĐQT Techcombank
 
"FPT không chỉ tạo ra những thành quả kinh tế đáng quý cho đất nước mà còn chuẩn bị cho thế hệ tương lai những giá trị văn hoá Việt đáng tự hào. Sử ký FPT sẽ viết tiếp những trang hào hùng vì một Việt Nam hưng thịnh."
Ông Mai Hữu Tín
Chủ tịch hội doanh nhân trẻ Việt Nam
 
"FPT là một tập thể chiến binh trí tuệ từ "liều chiến và tếu táo" đến một khối đoàn kết, dám chấp nhận áp lực đương đầu với mọi thách thức và mục tiêu đôi khi bị coi là không thể."
Ông Nguyễn Long
Phó Chủ tịch kiêm Tổng thư ký Hội Tin học Việt Nam
 
"FPT là hình mẫu rất đáng học hỏi và ngưỡng mộ với một tập thể những con người đầy đam mê, khát khao kiến tạo những giá trị mới cho đất nước, dẫn dắt và truyền cảm hứng về khởi nghiệp và vươn ra toàn cầu."
Ông Trần Trung Hiếu
Đồng sáng lập kiêm TGĐ TopCV','','',8,'','','','','',1),
		('trendingfollowing.webp',N'Trend Following',599000,N'CÔNG TY TNHH HAPPY LIVE',N'Nhà Xuất Bản Thế Giới','Michael W. Covel','',639,N'Thị trường chứng khoán qua bao thăng trầm vẫn thủy chung với bản tính bất định khó trị, đã khiến cho không biết bao nhiêu nhà đầu tư lao đao và chìm sâu thua lỗ. Chúng ta bắt buộc phải nhìn nhận rằng: Sẽ không có lối tắt để chiến thắng thị trường, nhưng chúng ta có thể đồng hành và kiếm lợi nhuận bền vững nhờ vào thị trường bằng hệ thống phương pháp đầu tư/giao dịch tối ưu nhất – mà ở đây, tác giả Michael W. Covel muốn đề cập đến chính là phương pháp đầu tư theo xu hướng.','','',8,'','','','','',2),
		('sachnghigiauvalamgiau.webp',N'Sách Nghĩ Giàu Và Làm Giàu (Bìa Mềm)',75200,N'First News - Trí Việt',N'Nhà Xuất Bản Tổng hợp TP.HCM','Napoleon Hill','12-15-2007',450,N'"Think and Grow Rich –Nghĩ giàu và Làm giàu là một trong những cuốn sách bán chạy nhất mọi thời đại. Đã hơn 60 triệu bản được phát hành với gần trăm ngôn ngữ trên toàn thế giới và được công nhận là cuốn sách tạo ra nhiều triệu phú, một cuốn sách truyền cảm hứng thành công nhiều hơn bất cứ cuốn sách kinh doanh nào trong lịch sử.

Tác phẩm này đã giúp tác giả của nó, Napoleon Hill, được tôn vinh bằng danh hiệu “người tạo ra những nhà triệu phú”. Đây cũng là cuốn sách hiếm hoi được đứng trong top của rất nhiều bình chọn theo nhiều tiêu chí khác nhau - bình chọn của độc giả, của giới chuyên môn, của báo chí. Lý do để Think and Grow Rich - Nghĩ giàu và làm giàu có được vinh quang này thật hiển nhiên và dễ hiểu: Bằng việc đọc và áp dụng những phương pháp đơn giản, cô đọng này vào đời sống của mỗi cá nhân mà đã có hàng ngàn người trên thế giới trở thành triệu phú và thành công bền vững.

Điều thú vị nhất là các bí quyết này có thể được hiểu và áp dụng bởi bất kỳ một người bình thường nào, hoạt động trong bất cứ lĩnh vực nào. Qua hơn 70 năm tồn tại, những đúc kết về thành công của Napoleon Hill đến nay vẫn không hề bị lỗi thời, ngược lại, thời gian chính là minh chứng sống động cho tính đúng đắn của những bí quyết mà ông chia sẻ.

Sinh ra trong một gia đình nghèo vùng Tây Virginia, con đường thành công của Napoleon Hill cũng trải qua nhiều thăng trầm. Khởi đầu bằng chân cộng tác viên cho một tờ báo địa phương lúc 15 tuổi, đến năm 19 tuổi Hill trở thành nhà quản lý mỏ than trẻ tuổi nhất, sau đó bỏ ngang để theo đuổi ngành luật. Napoleon Hill còn kinh qua nhiều nghề như kinh doanh gỗ, xe hơi, viết báo về kinh doanh…

Đó là những công việc ông từng nếm trải trước khi 25 tuổi! Song khác với những người thành đạt khác, ông cẩn thận phân tích từng sự kiện trọng đại trong đời mình, rút ra những bài học, rồi tiếp tục rút gọn chúng thành các nguyên tắc căn bản, tổ chức các nguyên tắc ấy thành triết lý sống và rèn luyệ

Cơ hội đặc biệt đã đến với Hill trong một lần phỏng vấn để viết về chân dung Andrew Carnegie - ông “vua thép” huyền thoại của Mỹ đã đi lên từ hai bàn tay trắng. Từ lần phỏng vấn đó, Napoleon Hill có dịp tiếp cận với những con người thành đạt và có quyền lực nhất tại Mỹ để tìm hiểu và học hỏi những bí quyết thành công của họ, trong thế so sánh và kiểm chứng với những công thức thành công của Andrew Carnegie. Ông muốn qua đó có thể đúc kết và viết nên một cuốn sách ghi lại những bí quyết giúp các cá nhân bình thường thành những người thành công trong xã hội.

Để thực hiện cuốn sách này, Napoleon Hill dành hầu như toàn bộ thời gian và công sức trong suốt gần ba mươi năm để phỏng vấn hơn 500 người nổi tiếng và thành công nhất trong nhiều lĩnh vực khác nhau, cùng hàng ngàn doanh nhân khác - cả những kẻ thất bại và những người thành công. Kết quả của những nghiên cứu không mệt mỏi đó là Think and Grow Rich - Nghĩ giàu và làm giàu - công thức, hay “cẩm nang” để trở thành vượt trội và được xã hội nể trọng.

Cuốn sách cũng đưa Napoleon Hill vào danh sách một trong những tác giả có tác phẩm bán chạy nhất thế giới từ trước đến nay. Được viết ra từ vô số những câu chuyện có thật, tác phẩm có một sức thuyết phục và lay động rất lớn. Bạn không chỉ được biết bí quyết về sự thành công của các tên tuổi như Edison - nhà phát minh lỗi lạc mà thời gian rèn luyện trong trường học chỉ… vỏn vẹn 3 tháng; như Henry Ford - người bị coi là không có học vấn nhưng đã trở thành ông trùm trong nền công nghiệp xe hơi với một gia tài kếch xù… mà còn của rất nhiều cá nhân trong nhiều lĩnh vực khác nhau đã đi lên từ con số không.

Think and Grow Rich - Nghĩ giàu và làm giàu là cuốn sách đầu tiên đưa ra triết lý thành đạt - một triết lý đầy đủ và toàn diện về thành công của cá nhân, đồng thời cung cấp cho bạn phương pháp để tạo một ý thức thành công cũng như đưa ra kế hoạch sơ bộ và chi tiết để đạt được thành công đó. Các bí quyết thành công được đề cập đến trong cuốn sách này có thể được đúc kết ngắn gọn: tất cả bắt nguồn từ cách nghĩ.

Do đó, cuốn sách này không chỉ thay đổi những điều bạn nghĩ mà còn có thể thay đổi cả cách nghĩ của bạn; không dừng lại ở việc chỉ ra cho bạn thấy bạn phải làm gì mà còn vạch cho bạn biết phải làm điều đó như thế nào để đạt được khát vọng của mình. Ra mắt bạn đọc với phiên bản cao cấp lần này, cuốn sách thay đổi nhiều về hình thức thiết kế bìa cứng, màu nâu đen, chữ vàng ánh kim dập nổi sang trọng, tinh tế.

Báo chí nói gì về cuốn sách:

“Nghĩ giàu làm giàu là tinh hoa được Napoleon Hill dành toàn bộ thời gian và công sức suốt gần 30 năm để phỏng vấn hơn 500 người nổi tiếng và thành công nhất trong nhiều lĩnh vực, cùng hàng ngàn doanh nhân khác. Cuốn sách này có giá trị vĩnh hằng theo thời gian về tính đúng đắn khi ứng dụng thực tiễn.” – Học Napoleon Hill "Nghĩ giàu làm giàu" (Một Thế Giới)

""Để có cảm hứng, hãy đọc “Nghĩ giàu và làm giàu!" Đó là bước đầu tiên để đưa ra chiến lược chiến thắng."" – The Sunday Times
Người nổi tiếng nói gì về cuốn sách:

""Trong hai mươi lăm năm qua, tôi đã được ban phước với nhiều may mắn hơn bất kỳ cá nhân nào xứng đáng nhưng tôi luôn rùng mình khi nghĩ mình sẽ ở đâu hôm nay, hoặc tôi sẽ làm gì nếu không được tiếp xúc với triết lý của Napoleon Hill. Nó đã thay đổi cuộc đời tôi."" - Og Mandino, tác giả của “Người bán hàng vĩ đại nhất thế giới”

“Đây là cuốn sách duy nhất về thành công cá nhân từng được viết; nó làm cho tôi trở thành một triệu phú từ người không có gì.” - Brian Tracy, tác giả của “Chinh phục mục tiêu”

Về tác giả
Napoleon Hill (1883 - 1970) là một tác gia người Mỹ, ông được coi là một trong những tác gia tiêu biểu thành công nhất trong lịch sử. Napoleon là một trong những người đầu tiên sáng tạo nên một thể loại văn học mới trong nền văn học hiện đại đó là văn học để phát triển thành công con người. Cuốn sách được biết đến nhiều nhất của ông là cuốn Think and Grow Rich (1937), cuốn sách đã bán được trên 20 triệu bản in trên toàn thế giới (tính tới thời điểm ông mất năm 1970). Cho tới nay cuốn sách này vẫn đang được dịch ra nhiều thứ tiếng trên thế giới và trở thành cuốn sách gối đầu giường của rất nhiều độc giả.
Ông từng được mời làm cố vấn cho Tổng thống Mỹ Franklin D.Roosevelt từ năm 1933 đến năm 1936. Napoleon Hill rất nổi tiếng với câu nói ""Những gì tâm trí có thể nhận thức được và tin tưởng thì nhất định tâm trí sẽ làm được"". Những thành tựu mà ông đã đạt được cũng như các công thức thành công mà ông đề cập tới đều có ảnh hưởng rất lớn tới nhiều thế hệ độc giả.','','',8,'','','','','',2),
		('demenphieuluuky.webp',N'Dế Mèn Phiêu Lưu Ký',108000,N'Nhà Xuất Bản Kim Đồng',N'Nhà Xuất Bản Kim Đồng','Tô Hoài','02-06-2023',144,N'Trong hơn nửa thế kỉ kể từ ngày ra mắt bạn đọc lần đầu tiên năm 1941, "Dế Mèn phiêu lưu kí" là một trong những sáng tác tâm đắc nhất của nhà văn Tô Hoài. 

Tác phẩm đã được tái bản nhiều lần và được dịch ra hơn 20 thứ tiếng trên thế giới và luôn được các thế hệ độc giả nhỏ tuổi đón nhận. 

Tác phẩm đã được xuất bản với nhiều hình thức khác nhau. 

Trong đó cuốn "Dế Mèn phiêu lưu kí" gồm 148 trang, trên khổ giấy 18x25 cm với nhiều minh hoạ sinh động của hoạ sĩ Tạ Huy Long - một hoạ sĩ chuyên vẽ cho sách thiếu nhi. 

Bằng cách sử dụng màu nước điêu luyện, hoạ sĩ Tạ Huy Long đã làm sống động thêm tác phẩm bất hủ của nhà văn Tô Hoài. 

Cuốn sách là món quà đẹp cả về hình thức lẫn nội dung, là món quà ý nghĩa và bổ ích mà các bậc phụ huynh tặng cho con em của mình.','','',8,'','','','','',2),
		('hoangtube.webp',N'Hoàng Tử Bé (Tái Bản 2019)',58000,'Nhã Nam',N'Nhà Xuất Bản Hội Nhà Văn','Antoine De Saint-Exupéry','',102,N'Hoàng tử bé được viết ở New York trong những ngày tác giả sống lưu vong và được xuất bản lần đầu tiên tại New York vào năm 1943, rồi đến năm 1946 mới được xuất bản tại Pháp. Không nghi ngờ gì, đây là tác phẩm nổi tiếng nhất, được đọc nhiều nhất và cũng được yêu mến nhất của Saint-Exupéry. Cuốn sách được bình chọn là tác phẩm hay nhất thế kỉ 20 ở Pháp, đồng thời cũng là cuốn sách Pháp được dịch và được đọc nhiều nhất trên thế giới. Với 250 ngôn ngữ dịch khác nhau kể cả phương ngữ cùng hơn 200 triệu bản in trên toàn thế giới, Hoàng tử bé được coi là một trong những tác phẩm bán chạy nhất của nhân loại.

Ở Việt Nam, Hoàng tử bé được dịch và xuất bản khá sớm. Từ năm 1966 đã có đồng thời hai bản dịch: Hoàng tử bé của Bùi Giáng do An Tiêm xuất bản và Cậu hoàng con của Trần Thiện Đạo do Khai Trí xuất bản. Từ đó đến nay đã có thêm nhiều bản dịch Hoàng tử bé mới của các dịch giả khác nhau. Bản dịch Hoàng tử bé lần này, xuất bản nhân dịp kỷ niệm 70 năm Hoàng tử bé ra đời, cũng là ấn bản đầu tiên được Gallimard chính thức chuyển nhượng bản quyền tại Việt Nam, hy vọng sẽ góp phần làm phong phú thêm việc dịch và tiếp nhận tác phẩm quan trọng này với các thế hệ độc giả.

Tôi cứ sống cô độc như vậy, chẳng có một ai để chuyện trò thật sự, cho tới một lần gặp nạn ở sa mạc Sahara cách đây sáu năm. Có thứ gì đó bị vỡ trong động cơ máy bay. Và vì ở bên cạnh chẳng có thợ máy cũng như hành khách nào nên một mình tôi sẽ phải cố mà sửa cho bằng được vụ hỏng hóc nan giải này. Với tôi đó thật là một việc sống còn. Tôi chỉ có vừa đủ nước để uống trong tám ngày.

Thế là đêm đầu tiên tôi ngủ trên cát, cách mọi chốn có người ở cả nghìn dặm xa. Tôi cô đơn hơn cả một kẻ đắm tàu sống sót trên bè giữa đại dương. Thế nên các bạn cứ tưởng tượng tôi đã ngạc nhiên làm sao, khi ánh ngày vừa rạng, thì một giọng nói nhỏ nhẹ lạ lùng đã đánh thức tôi. Giọng ấy nói:
“Ông làm ơn… vẽ cho tôi một con cừu!”
- Trích "Hoàng tử bé"','','',8,'','','','','',2),
		('tuidungtailieugiaya412ngan.webp',N'Túi Đựng Tài Liệu Giấy A4 12 Ngăn - Hàng Chính Hãng ',35000,'','','','',639,N'','','',8,'PaKaSa',N'Trung Quốc',N'Việt Nam','','',3),
		('combo20butbithienlongflexofficef0023.webp',N'Combo 20 Bút Bi Thiên Long Flexoffice FO-023',25000,N'Thiên Long','',N'Thiên Long','','',N'','','',8,N'Việt Nam',N'Việt Nam','','','',3),
		('dapghim.webp',N'Dập ghim #10 Deli, 15 trang Đen, Xám, Xanh - 1 cái E0229',37000,'','','Deli','','',N'TÍNH NĂNG SẢN PHẨM:

️Chất liệu hợp kim thép cứng cáp, có độ bền cao cùng khả năng chịu lực và chống gỉ sét tốt, đảm bảo thời gian sử dụng dài lâu.
️ Ruột ghim sử dụng là ghim số 10 (Được dung phổ biến trong văn phòng, học tập)
️ Cán cầm chống trơn có thể giúp bạn đóng gáy những quyển sách hoặc tài liệu một cách dễ dàng và nhanh chóng mà không cần dùng quá nhiều sức cho một tập giấy dày.
️ Dập ghim thiết kế dạng liền
️ Thiết kế bao gồm thêm chỗ lấy những chiếc ghim hỏng, không như ý ở phần cuối đế đựng ghim

THÔNG TIN SẢN PHẨM:
Tên sản phẩm: Dập ghim #10 Deli
Mã sản phẩm: E0229
Ghim sử dụng: Ghim số #10 Deli E0010N
Màu sắc: Xanh/ Đen/Trắng
---------------------------------------------------------------------------------------
Tự hào là một trong những nhãn hàng văn phòng phẩm lớn nhất tại Việt Nam, @Delivietnam không ngừng nỗ lực và phát triển trong lĩnh vực phân phối các sản phẩm cho các đơn vị văn phòng, trường học,... Với phương châm sản xuất những sản phẩm chất lượng tốt nhất và luôn đặt khách hàng làm trọng tâm, sứ mệnh của Deli là làm hài hòng người tiêu dùng toàn cầu với những sản phẩm chất lượng cao, độ tin cậy tuyệt đối và thân thiện với người dùng.

Khách hàng lựa chọn các sản phẩm của @Delivietnam sẽ được cam kết:
Sản phẩm chính hãng từ nhà máy Deli, nguồn gốc rõ ràng và chất lượng đạt tiêu chuẩn.
Bảo hành theo quy định của nhà sản xuất.
Giá cả hợp lý, cạnh tranh, rẻ nhất thị trường.
Hỗ trợ đổi trả hàng cho những sản phẩm bị thiếu.','','',8,'Trung Quốc','Trung Quốc','','','',3),
		('bangtapvietvedientu.webp',N'Bảng tập viết tập vẽ điện tử tự xóa thông minh LCD 8.5 inch',82170,'','','OEM','','',N'Thông tin sản phẩm:

️ Tên sản phẩm: Bảng viết điện tử tự xóa thông minh LCD 8.5 inch

️ Chất liệu: Nhựa ABS an toàn

️ Kích thước: 8.5inch

️ Trọng lượng: 124g

Ưu điểm:

️ Giúp bé yêu thích ham mê học tập, thỏa sức vẽ vời sáng tạo trên màn hình LCD, giúp bé từ bỏ điện thoại và máy tính bảng.

️ Tiết kiệm hàng chục quyển nháp và bút mực mỗi tháng và ko còn phải lo bé hít phải bụi phấn hay lem mực ra chân tay.

️ Màn hình LCD chịu được va đập mạnh.

️ Chỉ sử dụng 1 viên pin, thời gian sử dụng lên đến 2 năm, thay pin dễ dàng.

️ Cách xóa rất đơn giản chỉ với 1 nút ở trên màn hình, nét viết sáng đậm rõ ràng không lo bị lóa mắt hoặc hại mắt

- Chính sách của chúng tôi:

* Giao hàng nhanh nhất

* Chất lượng sản phẩm tốt nhất

* Đóng gói cẩn thận, chắc chắn

* Chế độ bảo hành đổi trả dễ dàng

* CSKH phản hồi nhiệt tình

* Quà tặng, Voucher hết nấc

Phương châm: Có tâm ắt có tầm','','',8,N'Việt Nam',N'Việt Nam','','','',3),
		('bangvietphan.webp',N'Bảng Viết Phấn Bavico BP03 Xanh – 0.8 x 1.2 m',590000,'','','','',639,N'Bảng Viết Phấn Bavico BP03 Xanh – 0.8 x 1.2 m

Bảng viết phấn Bavico BP03 xanh – 0.8 x 1.2 m được làm từ các nguyên liệu cao cấp, không bị cong vênh, chống ẩm mốc, mang lại giá trị sử dụng lâu bền. Ngoài ra, 4 góc của bảng được co nhựa đẹp, hài hòa với khung bảng, chống trầy xước, nên rất an toàn cho người dùng. Với kích thước lớn, bảng Bavico BP03 sẽ là công cụ học tập bổ ích cho trẻ, giúp cho việc học của trẻ được liên tục không bị gián đoạn, không mất thời gian lau sạch bảng nhiều lần.','','',8,N'Việt Nam',N'Việt Nam','','','',3),
		('thunhoibongchoshiba.webp',N'Thú Bông Chó Shiba Hóa Trang Cosplay Ngộ Nghĩnh',179000,'','','OEM','','',N'','','',8,'China','China','','','',4),
		('gaubonglacdaalpaca.webp',N'Gấu bông lạc đà Alpaca',245100,'','','OEM','','',N'Thú Bông Lạc Đà A Đán Bá Đạo Alpaca 28cm Quà Tặng Cưng Xỉu Siêu Hot
Thú Bông Lạc Đà A Đán Bá Đạo Alpaca 28cm dễ thương đang nằm trong danh sách những sản phẩm BÁN CHẠY và đang được các bạn trẻ YÊU THÍCH NHẤT.

Thú Bông Lạc Đà A Đán Bá Đạo Alpaca 28cm được thiết kế với 3 màu sắc cho bạn lựa chọn.

Đặc điểm nổi bật
- Thú Bông Lạc Đà A Đán Bá Đạo nhồi bông cao cấp, mềm mịn.

- An toàn, thân thiện với môi trường, thân thiện với da.

- Thú Bông Lạc Đà A Đán Bá Đạo đồ chơi siêu đáng yêu cho bé.

- Quà tặng siêu xịn cho mọi lứa tuổi.

- Kích thước: size 28cm

- Gấu bông Thú Bông Lạc Đà A Đán Bá Đạo cực cute, độc và lạ.','','',8,N'Chine','Chine','','','',4)

		
	

select * from items
select * from categories
select * from products


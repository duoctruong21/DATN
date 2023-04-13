create database MusicWeb
use MusicWeb



create table topic(
	id int identity(1,1) not null primary key,
	TopicName nvarchar(100) not null,
	TopicDescription nvarchar(500) not null,
	TopicImg nvarchar(500) not null,
	CreatedDate date not null,
	ModifiedDate date not null
)

go

create table category(
	id int identity(1,1) not null primary key,
	CategoryName nvarchar(100) not null,
	CategoryDescription nvarchar(500) not null,
	CategoryImg nvarchar(500) not null,
	CreatedDate date not null,
	ModifiedDate date not null,
)
go

create table topicWithCategory(
	idTopic int,
	idCategory int,
	PRIMARY KEY (idTopic, idCategory),
    FOREIGN KEY (idTopic) REFERENCES topic(id),
    FOREIGN KEY (idCategory) REFERENCES category(id)
)

go

create table album(
	id int identity(1,1) primary key not null,
	AlbumName nvarchar(100) not null,
	AlbumDescription nvarchar(500) not null,
	AlbumImg nvarchar(300) not null,
	CreatedDate date not null,
	ModifiedDate date not null
)
go

create table CategoryWithAlbum(
	idAlbum int,
	idCategory int,
	PRIMARY KEY (idAlbum, idCategory),
    FOREIGN KEY (idAlbum) REFERENCES album(id),
    FOREIGN KEY (idCategory) REFERENCES category(id)
)

go
create table singerImg(
	id int identity(1,1) primary key not null,
	singerimg nvarchar(500) not null,
	statusImg nvarchar(100) not null, 
	CreatedDate date not null,
	CreatedBy nvarchar(100) not null,
	ModifiedDate date not null,
	ModifiedBy nvarchar(100) not null
)
go

create table singer(
	id int identity(1,1) primary key not null,
	singerName nvarchar(100) not null,
	singerDescription nvarchar(500) not null,
	singerInfomation nvarchar(500) not null,
	CreatedDate date not null,
	CreatedBy nvarchar(100) not null,
	ModifiedDate date not null,
	ModifiedBy nvarchar(100) not null,

	idSingerimg int
	FOREIGN KEY (idSingerimg) REFERENCES singerImg(id),
)


go
create table songImg(
	id int identity(1,1) primary key not null,
	singerimg nvarchar(500) not null,
	statusImg nvarchar(100) not null, 
	CreatedDate date not null,
	CreatedBy nvarchar(100) not null,
	ModifiedDate date not null,
	ModifiedBy nvarchar(100) not null
)
go
create table song(
	id int identity(1,1) not null primary key,
	songName nvarchar(100) not null,
	viewCount int,
	ListenCount int,
	likeCount int,
	songDescription nvarchar(500),
	LyricSong nvarchar(max),
	CreatedDate date not null,
	CreatedBy nvarchar(100) not null,
	ModifiedDate date not null,

	idsongImg int,
	idSinger int,
	FOREIGN KEY (idsongImg) REFERENCES songImg(id),
    FOREIGN KEY (idSinger) REFERENCES singer(id)
)

go
create table AlbumWithSong(
	idAlbum int,
	idSong int,
	PRIMARY KEY (idAlbum, idSong),
    FOREIGN KEY (idAlbum) REFERENCES album(id),
    FOREIGN KEY (idSong) REFERENCES song(id)
)
go

create table UserWithSong(
	iduser nvarchar(300) not null,
	idsong int not null,
	status nvarchar(100) not null,
	PRIMARY KEY (iduser, idsong),
    FOREIGN KEY (idsong) REFERENCES song(id)
)


INSERT INTO singer(singerName, singerDescription, singerInfomation, CreatedDate, CreatedBy, ModifiedDate, ModifiedBy, idSingerimg)
VALUES('Mỹ Tâm', N'Her best-known songs are "Hoạ Mi Tóc Nâu" (Brown-Haired Nightingale) and "Ước Gì" (I Wish). With the unique voice and hit songs among Vietnamese people (not only youth, but also adults), she became famous so quickly and she is named “Brown-Haired Nightingale” after her famous song.', 'Birthday: January 16th, 1981, From: Da Nang, Vietnam', '2022-01-01', 'User 1', '2022-01-02', 'User 2', null),
	('Khởi My', 'She was famous for her strong voice and her bubbly character. She was awarded the 1st prize of “Your Face Sounds Similar 2013” TV show and 1st prize of “Student voice” 2007. She has many popular songs among Vietnamese youth such as "Đơn giản" ( Simple ),"Xa nhau từ đây."(Distance Apart)“Vì sao”(why), “Hạt cát" (grain of sand) and "Đôi cánh” (wings) are also hit songs.', 'Birthday: 2nd, January, 1990, From: Long Khanh, Vietnam', '2022-01-02', 'User', '2022-01-03', 'User 3', null),
	('Hồ Ngọc Hà', 'Previously, she was only known as a brilliant model. She became famous when she won the first prize in the super model contest of Vietnam in 2003 and 2004. Promotional for the brand as Sunplay, Toshiba, Sony Ericsson, Sunsilk...', 'Birthday: November 25th, 1984 From: Born in Đồng Hới, Vietnam', '2022-01-02', 'User', '2022-01-03', 'User 3', null),
	('Minh Hằng', 'With the beautiful face and special voice, she became a famous singer and actress in Vietnam. She was also well-known with the representative for some online game in Vietnam. With dancer, Atanas Georgiev Malamov, she won Strictly Come Dancing Vietnam, Series III. She has been voiced for Jewel in the Vietnamese dub of American 3D-Animated film, Rio...', 'Birthday: June 22nd, 1987 From: Ho Chi Minh city, Vietnam', '2022-01-02', 'User', '2022-01-03', 'User 3', null),
	('Sơn Tùng', 'With his talent, as well as passions for singing, Son Tung has become the most popular male singer in Vietnam: awarded by "Cơn mưa ngang qua" (Through the rain) and "Em của ngày hôm qua" (You of yesterday).', 'Birthday: July 5th, 1994 From: Thái Bình, Vietnam', '2022-01-02', 'User', '2022-01-03', 'User 3', null),
	('Singer', 'Description', 'Information', '2022-01-02', 'User', '2022-01-03', 'User 3', null);

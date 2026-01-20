create database khaimeaow_db;
use khaimeaow_db;

-- ///////////////////////--CREATE--/////////////////////////////// -- 

-- #1 
create table AdminInfo(
	AdminID				int				not null	primary key auto_increment,
    Admin_Firstname		varchar(255),
    Admin_Lastname		varchar(255),
    Admin_Phone			varchar(20),
    Admin_Email			varchar(255),
    Admin_Password		varchar(100)
);

-- #2 
create table Login_log(
	Login_logID		int				not null	primary key auto_increment,
    LoginDatetime	datetime		not null,
    AdminID			int				not null
    -- foreign key (AdminID) references AdminInfo (AdminID)
);

-- #3 
create table OrderInfo(
	OrderID			int								not null	primary key auto_increment,
    C_Firstname		varchar(255)					not null,	-- customer's firstname
    C_Lastname		varchar(255)					not null,	-- customer's lastname
    C_Nickname		varchar(255)					not null,	-- customer's nickname
    C_Phone			varchar(20)						not null,	-- customer's phone number
    TotalPrice		decimal(12,2)					not null,
    ReceiveDate		date							not null,
    OrderStatus		enum('Complete', 'In progress')	not null
);

-- #4
create table Payment(
	PaymentID			int				not null	primary key auto_increment,
    PaymentMethod		varchar(50)		not null,
    TransferReceipt		varchar(255)	,
    Amount				decimal(12,2)	not null,
    PaymentStatus		enum('Y', 'N')	not null,
    OrderID				int				not null,
	foreign key (OrderID) references OrderInfo (OrderID)
);

-- #5 
create table Cat(
	CatID		int								not null	primary key auto_increment,
    CatName		varchar(255)					not null,
    CatBreed	varchar(255)					not null,
    Gender		enum('Male', 'Female')			not null,
    CatColor	varchar(255)					not null, -- added
    Birthdate	date							not null,
    Price		decimal(12,2)					not null,
    CatStatus	enum('Available', 'Sold Out')	not null,
    Descript	TEXT					not null,
    CatImg		varchar(255)					not null, -- added
    CatDetailURL	varchar(255)				default null, -- added
    OrderID		int	,
    foreign key (OrderID) references OrderInfo (OrderID)
);

-- #6 
create table CatManagement(
	AdminID		int		not null,
    CatID		int		not null,
    primary key (AdminID, CatID),
    foreign key (AdminID) references AdminInfo (AdminID), 
    foreign key (CatID) references Cat (CatID)
);

-- #7 
create table CatMN_log(
	MN_logID		int				not null	primary key auto_increment,
    MNDatetime		datetime		not null,
    MNAction		varchar(255)	not null,
    AdminID			int				not null,
    CatID			int				not null
    -- foreign key (AdminID) references AdminInfo (AdminID), 
    -- foreign key (CatID) references Cat (CatID)
);

-- ///////////////////////--DROP FOREIGN KEYS--/////////////////////////////// -- 

-- SHOW CREATE TABLE OrderInfo;
-- SHOW CREATE TABLE AdminInfo;
-- SHOW CREATE TABLE Login_log;
-- SHOW CREATE TABLE CatMN_log;

SHOW CREATE TABLE CatManagement;
ALTER TABLE CatManagement DROP FOREIGN KEY catmanagement_ibfk_1; 
ALTER TABLE CatManagement DROP FOREIGN KEY catmanagement_ibfk_2;
 
SHOW CREATE TABLE Payment;
ALTER TABLE Payment DROP FOREIGN KEY payment_ibfk_1;

SHOW CREATE TABLE Cat;
ALTER TABLE Cat DROP FOREIGN KEY cat_ibfk_1; 

-- ///////////////////////--ARCHIVE TABLES--/////////////////////////////// -- 

CREATE TABLE IF NOT EXISTS AdminInfo_archive LIKE AdminInfo; 
CREATE TABLE IF NOT EXISTS OrderInfo_archive LIKE OrderInfo; 
CREATE TABLE IF NOT EXISTS Cat_archive LIKE Cat;

-- ///////////////////////--INSERT--/////////////////////////////// -- 

##1 
INSERT INTO AdminInfo (AdminID, Admin_Firstname, Admin_Lastname, Admin_Phone, Admin_Email, Admin_Password)
VALUES
(1, 'Somchai', 'Sukjai', '0812345678', 'somchai@example.com', 'password123'),
(2, 'Suda', 'Thongdee', '0898765432', 'suda@example.com', '123456'),
(3, 'Nattapong', 'Ratsamee', '0823456789', 'nattapong@example.com', 'admin2024');

select * from AdminInfo;

-- ##2 
INSERT INTO OrderInfo (OrderID, C_Firstname, C_Lastname, C_Nickname, C_Phone, TotalPrice, ReceiveDate, OrderStatus)
VALUES
(1, 'Kanya', 'Wong', 'Ying', '0911111111', 20000.00, '2025-01-10', 'Complete'),
(2, 'Prasit', 'Chaiya', 'Pong', '0922222222', 24800.00, '2025-02-12', 'In progress'),
(3, 'Warunee', 'Thongchai', 'Nee', '0933333333', 15000.00, '2025-01-15', 'Complete');

INSERT INTO OrderInfo (OrderID, C_Firstname, C_Lastname, C_Nickname, C_Phone, TotalPrice, ReceiveDate, OrderStatus)
VALUES
(null, 'Watsud', 'Wong', 'boy', '0864662865', 32000.00, '2025-04-26', 'Complete');

select * from OrderInfo;

-- ##3 
INSERT INTO Payment (PaymentID, PaymentMethod, TransferReceipt, Amount, PaymentStatus, OrderID)
VALUES
(1, 'Mobile Banking', 'receipt001.jpg', 20000.00, 'Y', 1),
(2, 'Mobile Banking', NULL, 24800.00, 'N', 2),
(3, 'PromptPay', 'receipt003.jpg', 15000.00, 'Y', 3);

select * from Payment;

-- ##4 
INSERT INTO Cat (CatID, CatName, CatBreed, Gender, CatColor, Birthdate, Price, CatStatus, Descript, CatImg, CatDetailURL, OrderID)
VALUES
(1, 'Milo', 'Siamese', 'Male', 'cream', '2024-06-01', 9000.00, 'Available', 'น่ารัก ขี้อ้อน ชอบนอนทั้งวัน', 'Milo.jpg', '/catalog/1', NULL),
(2, 'Luna', 'British shorthair', 'Female', 'calico', '2024-05-20', 20000.00, 'Sold Out', 'เรียบร้อย  กินเก่ง', 'Luna.jpg', '/catalog/2', 1),
(3, 'Leo', 'Exotic shorthair', 'Male', 'ginger', '2024-04-15', 35000.00, 'Available', 'ซน ชอบวิ่งเล่น นุ่มนิ่ม', 'Leo.jpg', '/catalog/3', NULL),
(4, 'Tofu', 'Ragdoll', 'Female', 'white', '2023-12-31', 25000.00, 'Available', 'ดุ  เรียบร้อย ขนนุ่ม', 'Tofu.jpg', '/catalog/4', NULL),
(5, 'Mashroom', 'Siamese', 'Female', 'cream', '2024-02-14', 8000.00, 'Available', 'ซน ชอบร้อง', 'Mashroom.jpg', '/catalog/5', NULL),
(6, 'Fufu', 'British shorthair', 'Male', 'tabby', '2024-01-01', 26000.00, 'Available', 'ชอบนวด ', 'Fufu.jpg', '/catalog/6', NULL),
(7, 'Muffin', 'Exotic shorthair', 'Male', 'grey', '2024-01-11', 32000.00, 'Available', 'ติดคน', 'Muffin.jpg', '/catalog/7', NULL),
(8, 'Cookie', 'Ragdoll', 'Female', 'cream', '2023-12-30', 24800.00, 'Available', 'ชอบดูนก', 'Cookie.jpg', '/catalog/8', NULL),
(9, 'Jackson', 'Exotic shorthair', 'Male', 'black', '2024-03-24', 24800.00, 'Sold Out', 'ขี้อาย', 'Jackson.jpg', '/catalog/9', 2),
(10, 'Satang', 'British shorthair', 'Female', 'tortoiseshell', '2025-01-05', 60000.00, 'Available', 'เรียบร้อย ขี้อาย  ', 'Satang.jpg', '/catalog/10', NULL),
(11, 'Caramel', 'Siamese', 'Male', 'cream', '2024-06-20', 15000.00, 'Sold Out', 'ซน ชอบร้อง', 'Caramel.jpg', '/catalog/11', 3);

select * from Cat;

-- ##5
INSERT INTO CatManagement (AdminID, CatID)
VALUES
(1, 1),
(2, 2),
(3, 3),
(2, 4),
(3, 5),
(1, 6),
(1, 7),
(2, 8),
(2, 9),
(3, 10),
(1, 11);

select * from CatManagement;



# MuKhaiMeaow
This is our Web Technology Project, the cat shop "KhaiMeaow"🐈╰(*°▽°*)╯

เว็บไซต์นี้เป็นแพลตฟอร์มสําหรับธุรกิจขายแมว สร้างขึ้นโดยใช้ Node.js เป็น backend และใช้ระบบฐานข้อมูล SQL เพื่อจัดเก็บและเรียกข้อมูลเกี่ยวกับแมวและบริการจำหน่ายแมว<br><br>

ในการเรียกใช้บริการ ผู้ใช้ต้องติดตั้ง module ทั้งหมดใน package.json โดยเปิด 2 terminal พร้อมกันได้แก่<br>
1. client terminal ใช้คำสั่ง 
```bash
npm install nodemon express cors
```
และในไฟล์ package.json ควรมี dependencies เพิ่มเองโดยอัตโนมัติ ดังนี้

```bash
{
  "name": "mukhaimeaow-client",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "start": "nodemon app.js"
  },
  "author": "khaimeaow_teamDev",
  "license": "ISC",
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^5.1.0",
    "nodemon": "^3.1.11"
  }
}

```
<br>
  2. server terminal ใช้คำสั่ง

```bash
npm install nodemon express dotenv mysql2 cors multer cookie-parser jsonwebtoken
```
และในไฟล์ package.json ควรมี dependencies เพิ่มเองโดยอัตโนมัติ ดังนี้

```bash
{
  "name": "mukhaimeaow-server",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "start": "nodemon app.js"
  },
  "author": "khaimeaow_teamDev",
  "license": "ISC",
  "dependencies": {
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.5",
    "dotenv": "^17.2.3",
    "express": "^5.1.0",
    "jsonwebtoken": "^9.0.2",
    "multer": "^2.0.2",
    "mysql2": "^3.15.3",
    "nodemon": "^3.1.11"
  }
}
```
<br>
หลังจากติดตั้ง module ที่จําเป็นทั้งหมดแล้ว ผู้ใช้จะต้องสร้างฐานข้อมูล SQL ใหม่ นําเข้าจากไฟล์ SQL ชื่อ “sec1_gr4_database.sql” และเปลี่ยนข้อมูลประจําตัวของ DB ใน .env ดังนี้

```bash
# PORT
PORT = 8080

# For Connection
DB_HOST = localhost
DB_USER = khaimeaow_teamDev
DB_PASSWD = 1234
DB_NAME = khaimeaow_db
SECRET = "secret"
```
<br>
ในการ run website ผู้ใช้จะต้องเปิด 2 terminals และใช้คำสั่งดังนี้<br>
1. client terminal
   
```bash
cd sec1_gr4_fe_src/client
npm start
```

2. server terminal

```bash
cd sec1_gr4_ws_src/server
npm start
```
<br>
เมื่อ run เสร็จสิ้นแล้วจะปรากฏข้อความในแต่ละ terminal ดังนี้

1. client terminal
```bash
Server listening on port: 3030
```

2. server terminal
```bash
Server listening on port: 8080
Connected DB: khaimeaow_db
```
<br>
เมื่อ terminal ทั้งสองปรากฏข้อความข้างต้นแล้ว ผู้ใช้สามารถเข้าถึง website ที่ “localhost:3030” ได้ เป็นอันเสร็จสิ้น<br><br>


Snapshot of the website :

<img width="1556" height="875" alt="preview1" src="https://github.com/user-attachments/assets/e271b424-3b9e-44e3-9a00-c08b01e3e32e" />
<img width="1647" height="926" alt="preview2" src="https://github.com/user-attachments/assets/7974446a-3723-4301-93e0-3791ac5f5283" />
<img width="1568" height="882" alt="preview3" src="https://github.com/user-attachments/assets/26302c26-0111-41ed-a845-3bf84eb50e96" />
<img width="1585" height="892" alt="preview4" src="https://github.com/user-attachments/assets/7cd5e67c-cf6f-4f39-a83d-97b46bfdd633" />
<img width="1564" height="880" alt="preview5" src="https://github.com/user-attachments/assets/958b83c7-2b09-43b9-b46f-7fb0642ee1fa" />

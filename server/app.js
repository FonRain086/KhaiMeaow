const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fs = require('fs');

dotenv.config();

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Allow frontend (port 3030) to talk to backend (port 8080)
app.use(cors({
    origin: 'http://localhost:3030',
    credentials: true
}));


// Connection
var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWD,
    database: process.env.DB_NAME
});

connection.connect(function (err) {
    if (err) throw err;
    console.log(`Connected DB: ${process.env.DB_NAME}`);
});

// Routers

app.get('/img/:filename', (req, res) => {
  const filePath = path.join(`${__dirname}/img/${req.params.filename}`);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: 'Image not found' });
  }
});


const searchRouter = require('./routes/search')(connection);
app.use('/search', searchRouter);

const loginRouter = require('./routes/login')(connection);
app.use('/login', loginRouter);

const auth = require('./routes/auth');

/*
    /////////////// TEST CASE: CHECK AUTHENTICATION///////////////
    Test case 1
      1)  Testing Login
          method: POST
          URL: http://localhost:8080/login
          body: raw JSON
          {
            "email": "suda@example.com",
            "password": "123456"
          }

      2)  Testing Check-auth
          method: GET
          URL: http://localhost:8080/check-auth

    Test case 2
      1)  Testing Login
          method: POST
          URL: http://localhost:8080/login
          body: raw JSON
          {
            "email": "somchai@example.com",
            "password": "password123"
          }

      2)  Testing Check-auth
          method: GET
          URL: http://localhost:8080/check-auth

    //////////////////////////////////////////////////////////////
*/

app.get('/check-auth', auth, (req,res) => {
    res.status(200).json({ loggedIn: true, user: req.user });
});


/*
    /////////////// TEST CASE: LOGOUT///////////////
    Test case 1
      1)  Testing Login
          method: POST
          URL: http://localhost:8080/login
          body: raw JSON
          {
            "email": "suda@example.com",
            "password": "123456"
          }

      2)  Testing Logout
          method: POST
          URL: http://localhost:8080/logout

    Test case 2
      1)  Testing Login
          method: POST
          URL: http://localhost:8080/login
          body: raw JSON
          {
            "email": "somchai@example.com",
            "password": "password123"
          }

      2)  Testing Logout
          method: POST
          URL: http://localhost:8080/logout

    //////////////////////////////////////////////////////////////
*/

app.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: false,   
    sameSite: 'lax'
  });
  res.status(200).json({ message: 'Logged out successfully' });
});

const catalogRouter = require('./routes/catalog')(connection);
app.use('/catalog', catalogRouter);

// API Routes
const genericApi = require('./api');

const productsRouter = require('./routes/prodManagementAPI');
app.use('/api/products', auth, productsRouter(connection));

const usersRouter = require('./routes/userManagementAPI');
app.use('/api/users', auth, usersRouter(connection));


// Listen PORT
app.listen(process.env.PORT, () => {
    console.log(`Server listening on port: ${process.env.PORT}`);
});
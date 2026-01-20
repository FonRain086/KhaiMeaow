const express = require('express');
const jwt = require("jsonwebtoken");

/*
    /////////////////// TEST CASE: LOGIN ///////////////////
        Testing Login (1)
        method: POST
        URL: http://localhost:8080/login
        body: raw JSON
        {
            "email": "suda@example.com",
            "password": "123456"
        }
        
        Testing Login (2)
        method: POST
        URL: http://localhost:8080/login
        body: raw JSON
        {
            "email": "somchai@example.com",
            "password": "password123"
        }

        Testing Login (3)
        method: POST
        URL: http://localhost:8080/login
        body: raw JSON
        {
            "email": "nattapong@example.com",
            "password": "admin2024"
        }

        Testing Login *Case Incorrect Email or Password*(4)
        method: POST
        URL: http://localhost:8080/login
        body: raw JSON
        {
            "email": "nattapong@example.com",
            "password": "55555"
        }

    ////////////////////////////////////////////////////////
    */ 

module.exports = (connection) => {
    const router = express.Router();

    router.post("/", (req, res) => {
        const { email, password } = req.body;

        connection.query(
            'SELECT * FROM AdminInfo WHERE Admin_Email = ? AND Admin_Password = ?',
            [email, password],
            (err, results) => {
                if (err) {
                    return res.status(500).json({ message: 'Server error' });
                }

                if (!results.length) {
                    return res.status(401).json({ message: 'Incorrect Email or Password' });
                }

                const user = results[0];

                // Create JWT token
                const token = jwt.sign(
                    {
                        id: user.AdminID,
                        email: user.Admin_Email,
                    },
                    process.env.SECRET,
                    { expiresIn: "1h" }
                );

                // Set cookie
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: false,       
                    sameSite: 'lax',
                    maxAge: 60 * 60 * 1000
                });

                return res.status(200).json({ message: 'Login success' }); //response to client          

            }
        );
    });

    return router;
};
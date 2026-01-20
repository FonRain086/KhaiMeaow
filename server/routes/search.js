const express = require('express');

/*
    /////////////////// TEST CASE: SEARCH ///////////////////
        Testing Search a Cat all(1)
        method: GET
        URL: http://localhost:8080/search
        
        Testing Search a Cat by Breed (2)
        method: GET
        URL: http://localhost:8080/search?breed=siamese

        Testing Search a Cat by Age and Color *Case No results found*(3)
        method: GET
        URL: http://localhost:8080/search?age=2&color=black

        Testing Search a Cat by common keyword (4)
        method: GET
        URL: http://localhost:8080/search?q=นุ่ม

        Testing Search a Cat by Habit (5)
        method: GET
        URL: http://localhost:8080/search?habit=ขี้อ้อน


    ////////////////////////////////////////////////////////
    */ 

module.exports = (connection) => {
    const router = express.Router();
    
    router.get('/', (req, res) => {

        const {q, breed, age, habit, color} = req.query;

        let sql = `SELECT CatID, CatName, CatBreed, Gender, CatColor, Birthdate, Price, CatStatus, Descript, CatImg, CatDetailURL
                    FROM Cat
                    WHERE 1=1 AND CatStatus = 'Available'`;
        const params = [];

        if (q) {
            const searchParam = `%${q.toLowerCase()}%`;
            sql += ` AND (CatName LIKE ? OR CatBreed LIKE ? OR Gender LIKE ? OR CatColor LIKE ? OR Descript LIKE ?)`;
            params.push(searchParam, searchParam, searchParam, searchParam, searchParam);
        }
        if (breed) {
            sql += ` AND CatBreed LIKE ?`;
            params.push(`%${breed}%`);
        }
        if (age) {
            sql += ` AND (YEAR(CURDATE()) - YEAR(Birthdate)) = ?`;
            params.push(age);
        }
        if (habit) {
            sql += ` AND Descript LIKE ?`;
            params.push(`%${habit}%`);
        }
        if (color) {
            sql += ` AND CatColor = ?`;
            params.push(color);
        }

        connection.query(sql, params, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({success: false});
            }
            if (results.length === 0) {
                return res.json({
                    success: true,
                    count: 0,
                    results: [],
                    message: "No results found"
                });
            }
            res.json({
                success: true,
                count: results.length,
                results: results
            });
            
        });

    });

    return router;
}
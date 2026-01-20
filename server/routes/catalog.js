const express = require('express');
const path = require('path');

module.exports = (connection) => {
    const router = express.Router();

    router.get('/data', (req, res) => {
        const sql = `
            SELECT CatID, CatName, CatBreed, Gender, CatColor, Birthdate, Price, CatStatus, Descript, CatImg, CatDetailURL
            FROM Cat
            ORDER BY CatID`;
        connection.query(sql, (err, results) => {
            if (err) {
                console.error("DB error:", err);
                return res.status(500).json({
                    success: false,
                });
            }

            // ส่ง JSON แบบรวม success, count และ results
            res.json({
                success: true,
                count: results.length,
                results: results
            });
        });
    });
    router.get('/detail/:id', (req, res) => {
        const catUrl = `/catalog/${req.params.id}`;
        const sql = `SELECT * FROM Cat WHERE CatDetailURL = ? LIMIT 1`;
        connection.query(sql, [catUrl], (err, results) => {

            if (results.length === 0)
                return res.status(404).json({
                    success: false,
                    message: "Cat not found"
                });
            res.json(results[0]);
        });
    });

    return router;
};
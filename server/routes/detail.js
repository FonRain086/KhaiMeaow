const express = require('express');
const path = require('path');

module.exports = (connection) => {
    const router = express.Router();

    router.get('/:id', (req, res) => {
        const catUrl = `/catalog/${req.params.id}`;
        const sql = `
        SELECT *, (YEAR(CURDATE()) - YEAR(Birthdate)) AS Age
        FROM Cat 
        WHERE CatDetailURL = ? LIMIT 1`;
        connection.query(sql, [catUrl], (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ success: false });
            }

            if (!results.length) {
                return res.status(404).json({
                    success: false,
                    message: "Cat not found"
                });
            }

            return res.json({
                success: true,
                count: results.length,
                results: results
            });
        });
    });

    return router;
}
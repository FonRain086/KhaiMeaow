const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
// const auth = require('./auth'); 
const auth = require('../routes/auth');


// const mysql = require('mysql2');
// const dotenv = require('dotenv');
// dotenv.config();

module.exports = (connection, tableConfig) => {
    const router = express.Router();

    router.use(auth);
    // const upload = multer({ dest: 'img/' });
    const { tableName, fields, searchFields, idField, fileFields } = tableConfig;
    
    /*
    /////////////// TEST CASE: SEARCH & VIEW ///////////////
        Testing Search Product all/default
        method: GET
        URL: http://localhost:8080/api/products

        Testing Search Product(Cat) by Breed and Color
        method: GET
        URL: http://localhost:8080/api/products?CatBreed=S&&CatColor=cream

        Testing Search Product(Cat) by status
        method: GET
        URL: http://localhost:8080/api/products?CatStatus=sold

        Testing Search User all/default
        method: GET
        URL: http://localhost:8080/api/users

        Testing Search User(Admin) by First Name
        method: GET
        URL: http://localhost:8080/api/users?Admin_Firstname=s

        Testing Search User(Admin) by Email
        method: GET
        URL: http://localhost:8080/api/users?Admin_Email=n
        

    ////////////////////////////////////////////////////////
    */ 

    // Search & View
    router.get('/', (req, res) => {
        let sql = `SELECT * FROM ${tableName} WHERE 1=1`; // Basic SELECT query
        const params = [];

        // Search All
        if (req.query.q && searchFields?.length > 0) {
            const q = `%${req.query.q}%`;
            const conditions = searchFields.map(f => `${f} LIKE ?`).join(' OR ');
            sql +=  ` AND ${conditions}`;
            searchFields.forEach( () => params.push(q)); 
        }

        // Specific Search
        Object.keys(req.query).forEach(key => {
            if (key === 'q') return;    // skip q

            if (searchFields.includes(key)){
                sql += ` AND ${key} LIKE ?`;
                params.push(`%${req.query[key]}%`);
            }
        });

        connection.query(sql, params, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(results);
        });
    });



    // multer
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './img');
        },
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname); // .jpg
            const name = path.basename(file.originalname, ext); // filename
            let finalName = file.originalname;

            const filePath = path.join('./img', finalName);
            if (fs.existsSync(filePath)) {
                return cb(null, `${name}-${Date.now()}${ext}`); // to protect duplicate file
            }

            cb(null, finalName);
            
        }
    });

    const upload = multer({ storage });

    /*
    /////////////////// TEST CASE: INSERT ///////////////////
        Testing Insert a new Cat (1)
        method: POST
        URL: http://localhost:8080/api/products
        body: raw JSON
        {
            "CatName": "Snowy",
            "CatBreed": "Siamese",
            "Gender": "Female",
            "CatColor": "white",
            "Birthdate": "2025-05-01",
            "Price": 12000,
            "CatStatus": "Available",
            "Descript": "น่ารักมาก ขี้เล่น",
            "CatImg": "snowy.jpg"
        }

        Testing Insert a new Cat (2)
        method: POST
        URL: http://localhost:8080/api/products
        body: raw JSON
        {
            "CatName": "Snowball",
            "CatBreed": "Persian",
            "Gender": "Female",
            "CatColor": "white",
            "Birthdate": "2025-07-01",
            "Price": 18000,
            "CatStatus": "Available",
            "Descript": "ขี้อ้อน ชอบเล่นกับคน",
            "CatImg": "snowball.jpg"
        }

        Testing Insert a new AdminInfo (1)
        method: POST
        URL: http://localhost:8080/api/users
        body: raw JSON
        {
            "Admin_Firstname": "Aom",
            "Admin_Lastname": "Srichan",
            "Admin_Phone": "0819998887",
            "Admin_Email": "aom@example.com",
            "Admin_Password": "aom1234"
        }

        Testing Insert a new Admin (2)
        method: POST
        URL: http://localhost:8080/api/users
        body: raw JSON
        {
            "Admin_Firstname": "Nicha",
            "Admin_Lastname": "Kongka",
            "Admin_Phone": "0859997777",
            "Admin_Email": "nicha@example.com",
            "Admin_Password": "nicha123"
        }

    ////////////////////////////////////////////////////////
    */ 
    // Insert
    router.post('/', upload.single(fileFields), (req, res) => {
        const keys = Object.keys(req.body).filter(k => fields.includes(k));
        const values = keys.map(k => req.body[k]);

        if (req.file) {
            keys.push(fileFields);
            values.push(req.file.filename);
        }

        // console.log('Keys:', keys);
        // console.log('Values:', values);
        // console.log('File:', req.file);

        const placeholders = keys.map(() => '?').join(', ');
        const sql = `INSERT INTO ${tableName} (${keys.join(', ')}) VALUES (${placeholders})`;

        connection.query(sql, values, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });

            res.json({ message: 'Record inserted', id: result.insertId });
        });
    
    });


    /*
    /////////////////// TEST CASE: UPDATE ///////////////////
        Testing Update a Cat (1)
        method: PUT
        URL: http://localhost:8080/api/products/1
        body: raw JSON
        {
            "Price": 15000,
            "CatStatus": "Sold Out",
            "Descript": "Updated: น่ารัก ขี้เล่นสุด ๆ"
        }
        
        Testing Update a Cat (2)
        method: PUT
        URL: http://localhost:8080/api/products/4
        body: raw JSON
        {
            "CatColor": "gray",
            "Price": 9000,
            "Descript": "Updated: ขี้เล่น นุ่มนิ่ม"
        }

        Testing Update a Admin (1)
        method: PUT
        URL: http://localhost:8080/api/users/2
        body: raw JSON
        {
            "Admin_Phone": "0895556666",
            "Admin_Email": "suda_new@example.com"
        }

        Testing Update a Admin (2)
        method: PUT
        URL: http://localhost:8080/api/users/3
        body: raw JSON
        {
            "Admin_Firstname": "SomchaiUpdated",
            "Admin_Phone": "0811112222"
        }

    ////////////////////////////////////////////////////////
    */ 
    // Update
    router.put('/:id', upload.single(fileFields), (req, res) => {
        const keys = Object.keys(req.body).filter(key => fields.includes(key));
        const values = keys.map(k => req.body[k]);

        if (req.file) {
            keys.push(fileFields);
            values.push(req.file.filename);
        }

        if (keys.length === 0) {
            return res.status(400).json({ error: 'No valid fields provided' });
        }

        const setFields = keys.map(k => `${k} = ?`).join(', ');
        const sql = `UPDATE ${tableName} SET ${setFields} WHERE ${idField} = ?`;
        values.push(req.params.id);

        connection.query(sql, values, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: `Record updated\n${idField}: ${req.params.id}`, id: req.params.id });
        });
        
    });


    /*
    /////////////////// TEST CASE: DELETE ///////////////////
        Testing Delete a Cat (1)
        method: DELETE
        URL: http://localhost:8080/api/products/3

        Testing Delete a Cat (2)
        method: DELETE
        URL: http://localhost:8080/api/products/4

        Testing Delete a Admin (1)
        method: DELETE
        URL: http://localhost:8080/api/users/1

        Testing Delete a Admin (2)
        method: DELETE
        URL: http://localhost:8080/api/users/2

    ////////////////////////////////////////////////////////
    */ 
    // Delete
        router.delete('/:id', (req, res) => {
            const recordId = req.params.id;

            // Archive record 
            const archiveSQL = `INSERT INTO ${tableName}_archive SELECT * FROM ${tableName} WHERE ${idField} = ?`;

            connection.query( archiveSQL, [recordId], (er) => {
                if (er) return res.status(500).json({ error: 'Failed to archive: ' + er.message });

                // DELETE
                const deleteSQL = `DELETE FROM ${tableName} WHERE ${idField} = ?`;
                connection.query(deleteSQL, [recordId], (err) => {
                    if (err) return res.status(500).json({ error: 'Failed to delete: ' + err.message })
            
                    res.json({ message: `Record archived and deleted\n${idField}: ${recordId}`, id: recordId });
                });
            });
            
        });

    return router;
    
};

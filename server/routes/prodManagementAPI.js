const express = require('express');
// const mysql = require('mysql2');
const genericApi = require('../api');
const dotenv = require('dotenv');
dotenv.config();

module.exports = (connection) => {
    // Search & View
    const tableConfig = {
        tableName: 'Cat',
        fields: [
            'CatID',
            'CatName',
            'CatBreed',
            'Gender',
            'CatColor',
            'Birthdate',
            'Price',
            'CatStatus',
            'Descript',
            'CatImg',
            'CatDetailURL',
            'OrderID' // nullable
        ],
        searchFields: [
            'CatID',
            'CatName',
            'CatBreed',
            'Gender',
            'CatColor',
            'Birthdate',
            'Price',
            'CatStatus',
            'Descript',
            'CatImg',
            'CatDetailURL',
            'OrderID'
        ],
        idField: 'CatID',
        fileFields: 'CatImg'
    };

    return genericApi(connection, tableConfig);
}

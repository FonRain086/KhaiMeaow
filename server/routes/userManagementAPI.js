const express = require('express');
// const mysql = require('mysql2');
const genericApi = require('../api');
const dotenv = require('dotenv');
dotenv.config();

module.exports = (connection) => {
    // Search & View
    const tableConfig = {
        tableName: 'AdminInfo',
        fields: [
            'AdminID',
            'Admin_Firstname',
            'Admin_Lastname',
            'Admin_Phone',
            'Admin_Email',
            'Admin_Password'
        ],
        searchFields: [
            'AdminID',
            'Admin_Firstname',
            'Admin_Lastname',
            'Admin_Phone',
            'Admin_Email',
            'Admin_Password'
        ],
        idField: 'AdminID'
        // fileFields: null
    };

    return genericApi(connection, tableConfig);
}
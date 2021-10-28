const mysql = require('mysql');
const mysqlConnection = require('../database/connection');
const express = require('express');
const router = express.Router();
const SearchBar = require('../controllers/SearchBar');

router.get("/search/:osId", SearchBar.searchQuery)

module.exports = router;
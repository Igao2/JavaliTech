const express = require('express');
const router = express.Router();
const SearchBar = require('./controllers/SearchBar');
const Register = require('./controllers/Register');
const uploadUserImage = require('./middleware/uploadImage');


router.get("/search/:osId", SearchBar.searchQuery)
router.post("/register", uploadUserImage.single('image'), Register.registerQuery)

module.exports = router;
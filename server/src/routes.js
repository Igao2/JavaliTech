const express = require('express');
const router = express.Router();
const SearchBar = require('./controllers/SearchBar');
const Register = require('./controllers/Register');
const Login = require('./controllers/Login');

const uploadUserImage = require('./middleware/uploadImage');


router.get("/search/:osId", SearchBar.searchQuery)

router.post("/register", uploadUserImage.single('image'), Register.registerQuery)
router.post("/login", Login.loginQuery)

module.exports = router;
const express = require('express');
const router = express.Router();
const SearchBar = require('./controllers/SearchBar');
const Register = require('./controllers/Register');
const Login = require('./controllers/Login');
const ListarOS = require('./controllers/ListarOS');

const uploadUserImage = require('./middleware/uploadImage');
const validateToken = require('./middleware/validateToken')


router.get("/search/:osId", SearchBar.searchQuery)
router.get("/listarOS/:page", validateToken, ListarOS.listarOSQuery)

router.post("/register", uploadUserImage.single('image'), Register.registerQuery)
router.post("/login", Login.loginQuery)

module.exports = router;
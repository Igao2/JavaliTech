const express = require('express');
const router = express.Router();

const SearchBar = require('./controllers/SearchBar');
const Register = require('./controllers/Register');
const Login = require('./controllers/Login');
const ListOS = require('./controllers/ListOS');
const UserInfos = require('./controllers/UserInfos');
const UpdateInfos = require('./controllers/UpdateInfos');
const CreateOs = require('./controllers/CreateOs');
const OsValidate = require('./controllers/OsValidate');
const OsInfos = require('./controllers/OsInfos');
const EditOs = require('./controllers/EditOs');

const uploadUserImage = require('./middleware/uploadImage');
const validateToken = require('./middleware/validateToken')


router.get("/search/:osId", SearchBar.searchQuery)
router.get("/listOS/:page", validateToken, ListOS.listOSQuery)
router.get("/UserInfos", validateToken, UserInfos.UserInfosQuery)
router.get("/osValidate/:osId/:osPass", OsValidate.validateQuery)
router.get("/OsInfos/:osId/:osPass", OsInfos.osInfosQuery)

router.post("/register", uploadUserImage.single('image'), Register.registerQuery)
router.post("/login", Login.loginQuery)

router.post("/createOs", validateToken, CreateOs.createOsQuery)
router.post("/editOs", validateToken, EditOs.editOsQuery)
router.post("/updateInfos/imageSetting", validateToken, UpdateInfos.imageSetting)
router.post("/updateInfos/image", validateToken, uploadUserImage.single('image'), UpdateInfos.image)
router.post("/updateInfos/email", validateToken, UpdateInfos.email)
router.post("/updateInfos/dados", validateToken, UpdateInfos.dados)
router.post("/updateInfos/senha", validateToken, UpdateInfos.senha)
router.post("/updateInfos/delete", validateToken, UpdateInfos.deleteUser)

module.exports = router;
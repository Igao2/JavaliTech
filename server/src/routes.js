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
const DeleteOs = require('./controllers/DeleteOs');

const uploadUserImage = require('./middleware/uploadImage');
const validateToken = require('./middleware/validateToken')


//GET 
/**
 * @async
 * @function Route-search
 * @description Pesquisa se uma determinada OS existe
 * @type {GET}
 * @param {string} osId Contém o codico de uma determinada OS
 * @listens SearchBar.searchQuery --> executa o processo em: {@link SearchBar}
 */
router.get("/search/:osId", SearchBar.searchQuery)

/**
 * @async
 * @function Route-listOS
 * @description Lista as OS's existes com um determinado filtro
 * @type {GET}
 * @param {string} page Contém a pagina atual da paginação da lista
 * @listens validateToken --> válida a autorização de acesso em: {@link module:Middleware-validateToken Middleware-validateToken}
 * @listens ListOS.listOSQuery --> executa o processo em: {@link ListOS}
 */
router.get("/listOS/:page", validateToken, ListOS.listOSQuery)

/**
 * @async
 * @function Route-UserInfos
 * @description Retorna informações básicas do usuário
 * @type {GET}
 * @listens validateToken --> válida a autorização de acesso em: {@link module:Middleware-validateToken Middleware-validateToken}
 * @listens UserInfos.UserInfosQuery --> executa o processo em: {@link UserInfos}
 */
router.get("/UserInfos", validateToken, UserInfos.UserInfosQuery)

/**
 * @async
 * @function Route-osValidate
 * @description Verifica se existe uma OS com determinados "ID" e "senha"
 * @type {GET}
 * @param {string} osId Contém o ID da OS
 * @param {string} osPass Contém a senha da OS
 * @listens OsValidate.validateQuery --> executa o processo em: {@link OsValidate}
 */
router.get("/osValidate/:osId/:osPass", OsValidate.validateQuery)

/**
 * @async
 * @function Route-OsInfos
 * @description Retorna as informações da OS com determinados "ID" e "senha"
 * @type {GET}
 * @param {string} osId Contém o ID da OS
 * @param {string} osPass Contém a senha da OS
 * @listens OsInfos.osInfosQuery --> executa o processo em: {@link OsInfos}
 */
router.get("/OsInfos/:osId/:osPass", OsInfos.osInfosQuery)



//POST
/**
 * @async
 * @function Route-register
 * @description Registra um novo usuário
 * @type {POST}
 * @listens uploadUserImage.single() --> manipula de valida a imagem de perfil em: {@link module:Middleware-multer Middleware-multer}
 * @listens Register.registerQuery --> executa o processo em: {@link Register}
 */
router.post("/register", uploadUserImage.single('image'), Register.registerQuery)

/**
 * @async
 * @function Route-login
 * @description Retorna um JWT caso as informações do usuário estejam certas
 * @type {POST}
 * @listens Login.loginQuery --> executa o processo em: {@link Login}
 */
router.post("/login", Login.loginQuery)

/**
 * @async
 * @function Route-createOs
 * @description Registra uma nova OS
 * @type {POST}
 * @listens validateToken --> válida a autorização de acesso em: {@link module:Middleware-validateToken Middleware-validateToken}
 * @listens CreateOs.createOsQuery --> executa o processo em: {@link CreateOs}
 */
router.post("/createOs", validateToken, CreateOs.createOsQuery)

/**
 * @async
 * @function Route-editOs
 * @description Edita uma OS existente
 * @type {POST}
 * @listens validateToken --> válida a autorização de acesso em: {@link module:Middleware-validateToken Middleware-validateToken}
 * @listens EditOs.editOsQuery --> executa o processo em: {@link EditOs}
 */
router.post("/editOs", validateToken, EditOs.editOsQuery)

/**
 * @async
 * @function Route-updateInfos-imageSetting
 * @description Altera as configurações da foto de perfil do usuário
 * @type {POST}
 * @listens validateToken --> válida a autorização de acesso em: {@link module:Middleware-validateToken Middleware-validateToken}
 * @listens UpdateInfos.imageSetting --> executa o processo em: {@link UpdateInfos}
 */
router.post("/updateInfos/imageSetting", validateToken, UpdateInfos.imageSetting)

/**
 * @async
 * @function Route-updateInfos-image
 * @description Altera a foto de perfil do usuário
 * @type {POST}
 * @listens validateToken --> válida a autorização de acesso em: {@link module:Middleware-validateToken Middleware-validateToken}
 * @listens uploadUserImage.single() --> manipula de valida a imagem de perfil em: {@link module:Middleware-multer Middleware-multer}
 * @listens UpdateInfos.image --> executa o processo em: {@link UpdateInfos}
 */
router.post("/updateInfos/image", validateToken, uploadUserImage.single('image'), UpdateInfos.image)

/**
 * @async
 * @function Route-updateInfos-email
 * @description Altera o email do usuário
 * @type {POST}
 * @listens validateToken --> válida a autorização de acesso em: {@link module:Middleware-validateToken Middleware-validateToken}
 * @listens UpdateInfos.email --> executa o processo em: {@link UpdateInfos}
 */
router.post("/updateInfos/email", validateToken, UpdateInfos.email)

/**
 * @async
 * @function Route-updateInfos-email
 * @description Altera os dados do usuário
 * @type {POST}
 * @listens validateToken --> válida a autorização de acesso em: {@link module:Middleware-validateToken Middleware-validateToken}
 * @listens UpdateInfos.dados --> executa o processo em: {@link UpdateInfos}
 */
router.post("/updateInfos/dados", validateToken, UpdateInfos.dados)

/**
 * @async
 * @function Route-updateInfos-senha
 * @description Altera o senha do usuário
 * @type {POST}
 * @listens validateToken --> válida a autorização de acesso em: {@link module:Middleware-validateToken Middleware-validateToken}
 * @listens UpdateInfos.senha --> executa o processo em: {@link UpdateInfos}
 */
router.post("/updateInfos/senha", validateToken, UpdateInfos.senha)



//DELETE
/**
 * @async
 * @function Route-deleteOs
 * @description Deleta uma OS específica
 * @type {DELETE}
 * @param {string} osId Contém o ID da OS
 * @listens validateToken --> válida a autorização de acesso em: {@link module:Middleware-validateToken Middleware-validateToken}
 * @listens DeleteOs.deleteOsQuery --> executa o processo em: {@link DeleteOs}
 */
router.delete("/deleteOs/:osId", validateToken, DeleteOs.deleteOsQuery)

/**
 * @async
 * @function Route-updateInfos-delete
 * @description Deleta a conta de um usuário
 * @type {DELETE}
 * @listens validateToken --> válida a autorização de acesso em: {@link module:Middleware-validateToken Middleware-validateToken}
 * @listens UpdateInfos.deleteUser --> executa o processo em: {@link UpdateInfos}
 */
router.delete("/updateInfos/delete", validateToken, UpdateInfos.deleteUser)

module.exports = router;
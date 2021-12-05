import api from './api'

/**
 * @async
 * @function AppDispatcher-loginManager
 * @description Requisição para para altertificar o login
 * @param {JSON} request Contém as informações de login
 * @returns {string} Retorna um JWT - JSON Web Token com o id do usuário. Este Token é utilizado posteriormente para a identificação em outras rotas
 */
const loginManager = async function (request) { return await api.post('/login', request) }

export default loginManager;
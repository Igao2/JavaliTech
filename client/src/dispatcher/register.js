import api from './api'

/**
 * @async
 * @function AppDispatcher-registerProfileManager
 * @description Requisição para registrar uma novo usuario
 * @param {object} request Contém os dados do novo usuarido.
 */
const registerProfileManager = async function (request) { return await api.post('/register', request) }

export default registerProfileManager;

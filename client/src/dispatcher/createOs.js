import api from './api'

/**
 * @async
 * @function AppDispatcher-createOsManager
 * @description Requisição para criar uma nova OS
 * @param {JSON} request Contém as informações da nova OS
 * @param {JSON} header Contém o JWT com o id de identificação
 */
const createOsManager = async function (request, header) { return await api.post('/createOs', request, header) }

export default createOsManager;

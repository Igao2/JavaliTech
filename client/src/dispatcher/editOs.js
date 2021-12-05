import api from './api'

/**
 * @async
 * @function AppDispatcher-editOsManager
 * @description Requisição para editar OS existente
 * @param {JSON} request Contém as novas informações da OS
 * @param {JSON} header Contém o JWT com o id de identificação
 */
const editOsManager = async function (request, header) { return await api.post('/editOs', request, header) }

export default editOsManager;

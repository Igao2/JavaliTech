import api from './api'

/**
 * @async
 * @function AppDispatcher-deleteOsManager
 * @description Requisição para deletar OS existente
 * @param {string} request Contém o código da OS a ser deletada
 * @param {JSON} header Contém o JWT com o id de identificação
 */
const deleteOsManager = async function (request, header) { return await api.delete('/deleteOs/' + request, header) }

export default deleteOsManager;

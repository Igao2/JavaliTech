import api from './api'

/**
 * @async
 * @function AppDispatcher-osInfosResultManager
 * @description Requisição para obter informações de uma determinada OS
 * @param {string} osId Contém o ID da OS
 * @param {string} osPass Contém a senha da OS
 */
const osInfosResultManager = async function (osId, osPass) { return await api.get('OsInfos/' + osId + "/" + osPass); }

export default osInfosResultManager;

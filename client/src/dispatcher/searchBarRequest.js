import api from './api'

/**
 * @async
 * @function AppDispatcher-searchResultManager
 * @description Requisição para obter informações básicas de uma determinada OS
 * @param {string} osId Contém o ID da OS
 */
const searchResultManager = async function (osId) { return await api.get('search/' + osId); }

export default searchResultManager;

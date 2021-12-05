import api from './api'

/**
 * @async
 * @function AppDispatcher-listOSRequestManager
 * @description Requisição para obter os dados para a tabela de OS's
 * @param {number} page Contém a página requisitada da listagem de OS
 * @param {URLSearchParams} filter Contém os filtros para a listagem de OS
 * @param {JSON} header Contém o JWT com o id de identificação
 */
const listOSRequestManager = async (page, filter, header) => {
    return await api.get('/listOS/' + page + "?" + filter, header);
}

export default listOSRequestManager;

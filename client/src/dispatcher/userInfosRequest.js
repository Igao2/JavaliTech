import api from './api'

/**
 * @async
 * @function AppDispatcher-userInfosRequestManager
 * @description Requisição para obter os dados básicos do usuario
 * @param {JSON} header Contém o JWT com o id de identificação
 */
const userInfosRequestManager = async (header) => { return await api.get('/UserInfos', header); }

export default userInfosRequestManager;

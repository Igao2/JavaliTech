import api from './api'

/**
 * @async
 * @function AppDispatcher-osValidateManager
 * @description Requisição para verificar se existe uma OS com determinados "código" e "senha"
 * @param {string} osId Contém o ID da OS
 * @param {string} osPass Contém a senha da OS
 */
const osValidateManager = async function (osId, osPass) { return await api.get('osValidate/' + osId + "/" + osPass); }

export default osValidateManager;

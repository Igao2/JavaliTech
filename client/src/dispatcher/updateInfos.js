import api from './api'

/**
 * @async
 * @function AppDispatcher-updateInfosRequestManager
 * @description Requisição para alterar/atualizar dados do usuário
 * @param {number} type Contém o tipo de alteração
 * @param {JSON} info Contém dados a serem alterados
 * @param {JSON} header Contém o JWT com o id de identificação
 */
const updateInfosRequestManager = async (type, info, header) => {
    var url;

    if (type == 0) url = '/updateInfos/imageSetting';
    if (type == 1) url = '/updateInfos/image';
    if (type == 2) url = '/updateInfos/email';
    if (type == 3) url = '/updateInfos/dados';
    if (type == 4) url = '/updateInfos/senha';
    if (type == 5) return await api.delete('/updateInfos/delete', info, header);;

    return await api.post(url, info, header);
}

export default updateInfosRequestManager;
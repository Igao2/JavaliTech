import api from './api'

const listarOSRequestManager = async (page, filter, header) => {
    return await api.get('listarOS/' + page + "?" + filter, header);
}

export default listarOSRequestManager;

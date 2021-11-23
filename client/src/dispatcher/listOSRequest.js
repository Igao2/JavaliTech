import api from './api'

const listOSRequestManager = async (page, filter, header) => {
    return await api.get('/listOS/' + page + "?" + filter, header);
}

export default listOSRequestManager;

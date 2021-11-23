import api from './api'

const createOsManager = async function (request, header) { return await api.post('/createOs', request, header) }

export default createOsManager;

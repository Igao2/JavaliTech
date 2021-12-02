import api from './api'

const editOsManager = async function (request, header) { return await api.post('/editOs', request, header) }

export default editOsManager;

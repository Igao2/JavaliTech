import api from './api'

const deleteOsManager = async function (request, header) { return await api.delete('/deleteOs/' + request, header) }

export default deleteOsManager;

import api from './api'

const loginManager = async function (request) { return await api.post('/login', request) }

export default loginManager;

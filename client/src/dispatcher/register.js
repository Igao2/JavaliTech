import api from './api'

const registerProfileManager = async function (request) { return await api.post('/register', request) }

export default registerProfileManager;

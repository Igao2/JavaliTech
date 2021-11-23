import api from './api'

const userInfosRequestManager = async (header) => { return await api.get('/UserInfos', header); }

export default userInfosRequestManager;

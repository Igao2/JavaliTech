import api from './api'

const osInfosResultManager = async function (osId, osPass) { return await api.get('OsInfos/' + osId + "/" + osPass); }

export default osInfosResultManager;

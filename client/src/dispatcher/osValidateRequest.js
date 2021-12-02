import api from './api'

const osValidateManager = async function (osId, osPass) { return await api.get('osValidate/' + osId + "/" + osPass); }

export default osValidateManager;

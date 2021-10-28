import api from './api'

const searchResultManager = async function (osId) { return await api.get('search/' + osId); }

export default searchResultManager;

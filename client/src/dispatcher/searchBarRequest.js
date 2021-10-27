import api from './api'

const searchResultManager = async function (osId) { return await api.get('searchBar/' + osId); }

export default searchResultManager;

const axios = require('axios');

/**
 * @function AppDispatcher-api
 * @description Configura as requisições para a API
 */
const api = axios.create({
    baseURL: "https://javaliTechServer.droanle.repl.co"
})

export default api;
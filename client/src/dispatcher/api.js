const axios = require('axios');

const api = axios.create({
    baseURL: "https://javaliTechServer.droanle.repl.co"
})

export default api;
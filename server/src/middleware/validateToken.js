const definitions = require('../assets/definitions.json');
const jwt = require('jsonwebtoken');

/**
     * @module Middleware-validateToken
     * @description valida o token
     * @param {object} req Conteúdo da requisição "request"
     * @param {string} req.headers.authentication Contém o JWT para a validação
     * @param {object} res "response"
     * @param {function} next passa para o proximo middleware
     */
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authentication.split(' ')[1];
        req.userId = jwt.verify(token, definitions.jwtKey);
        next()
    } catch (error) {
        res.json({
            erro: true,
            code: 401,
            erroDetails: {
                mensagem: "Token invalido."
            }
        });

    }
}
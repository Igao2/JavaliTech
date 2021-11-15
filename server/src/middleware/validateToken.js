const definitions = require('../assets/definitions.json');
const jwt = require('jsonwebtoken');

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
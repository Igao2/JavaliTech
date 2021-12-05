const mysql = require('mysql');
const mysqlConnection = require('../database/connection');
const definitions = require('../assets/definitions.json');
const validateInformation = require('../Model/validateInformation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * @async
 * @class
 * @description Retorna um JWT caso as informações do usuário estejam certas
 */
class Login {
    /**
     * @param {object} req Conteúdo da requisição "request"
     * @param {object} req.body Contém as informações para o login
     * @param {string} req.body.email Contém o email do usuario
     * @param {string} req.body.password Contém a senha do usuário
     * @param {object} res "response"
     */
    loginQuery(req, res) {

        function registerResultQuery(data) {
            return new Promise((resolve, reject) => {

                var validate = new validateInformation(data);
                let valida = validate.checkLogin;

                if (valida.erro) {
                    reject(valida)
                } else {
                    const connection = mysql.createConnection(mysqlConnection);

                    connection.connect();

                    connection.query((`SELECT id, email, password FROM user WHERE email='${data.email}';`), (error, response) => {
                        if (error)
                            reject({
                                erro: true,
                                code: 500,
                                erroDetails: {
                                    mensagem: "Ouve um erro em nosso sistema. Tente novamente mais tarde."
                                }
                            });

                        let errorMensage = {
                            erro: true,
                            code: 401,
                            mensagem: "Falha na autenticação."
                        };

                        if (response.length != 1) reject(errorMensage);
                        else bcrypt.compare(data.password, response[0].password, (err, result) => {
                            if (err) reject(errorMensage);
                            else if (result) {
                                const token = jwt.sign(
                                    {
                                        id: response[0].id
                                    },
                                    definitions.jwtKey,
                                    {
                                        expiresIn: "7 days"
                                    }
                                )
                                resolve(token)
                            }
                            else reject(errorMensage);
                        })
                    });

                    connection.end();
                }
            });
        }

        registerResultQuery(req.body)
            .then(result => {
                res.json({
                    erro: false,
                    code: 200,
                    token: result
                });

            }).catch(error => {
                res.json(error);
            });
    }
}
module.exports = new Login();
const mysql = require('mysql');
const mysqlConnection = require('../database/connection');
const fs = require('fs')
const definitions = require('../assets/definitions.json');
const validateInformation = require('../Model/validateInformation');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(definitions.bcryptSalt);

class DeleteOs {
    deleteOsQuery(req, res) {
        const userId = req.userId.id;
        const codeId = req.params.osId;

        function deleteQuery() {
            return new Promise((resolve, reject) => {


                const connection = mysql.createConnection(mysqlConnection);

                const error505 = {
                    erro: true,
                    code: 500,
                    mensagem: "Ouve um erro em nosso sistema. Tente novamente mais tarde."
                };

                connection.connect();
                connection.query((`DELETE FROM service_order WHERE user_id=${userId} AND service_order_id='${codeId}'`), (error, userInformation) => {
                    if (error) { console.log(error); reject(error505); }
                    else resolve()
                });
                connection.end();

            });


        }

        deleteQuery()
            .then(result => {
                res.json({
                    erro: false,
                    code: 200,
                    mensagem: "Alteração realizada com sucesso"
                })
            }).catch(error => {
                res.json(error)
            });
    }

}

module.exports = new DeleteOs();

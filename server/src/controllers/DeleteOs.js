const mysql = require('mysql');
const mysqlConnection = require('../database/connection');

/**
 * @async
 * @class
 * @description Deleta uma OS específica
 */
class DeleteOs {

    /**
     * @param {object} req Conteúdo da requisição "request"
     * @param {string} req.userId.id Contém o ID do usuário
     * @param {string} req.params.osId Contém o ID da OS
     * @param {object} res "response"
    */
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

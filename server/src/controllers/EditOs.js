const mysql = require('mysql');
const mysqlConnection = require('../database/connection');
const fs = require('fs')
const definitions = require('../assets/definitions.json');
const validateInformation = require('../Model/validateInformation');
const osCodeFactory = require('../Model/osCodeFactory');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(definitions.bcryptSalt);

/**
 * @async
 * @class
 * @description Edita uma OS existente
 */
class EditOs {

    /**
     * @param {object} req Conteúdo da requisição "request"
     * @param {string} req.params.osId  Contém o ID da OS
     * @param {object} req.body Contém as informações para a edição da OS
     * @param {string} req.body.senha Contém a senha
     * @param {string} req.body.ownerInformation Contém o texto de informação do cliente
     * @param {string} req.body.ownerName Contém o nome do cliente
     * @param {string} req.body.description Contém a descrição
     * @param {string} req.body.deviceName Contém o nome do dispositivo
     * @param {date} req.body.deliveryDate Contém a data de entrega
     * @param {date} req.body.completionDate Contém a data estimada ou definitiva de conclusão
     * @param {number} req.body.status Contém o status de progresso da OS
     * @param {number} req.body.serviceValue Contém o valor/preço do serviço
     * @param {object} res "response"
     */
    editOsQuery(req, res) {
        const userId = req.userId.id;


        try {
            function editOsResultQuery() {
                return new Promise((resolve, reject) => {
                    const error500 = {
                        erro: true,
                        code: 500,
                        erroDetails: {
                            mensagem: "Ouve um erro em nosso sistema. Tente novamente mais tarde."
                        }
                    }

                    let data = new Date();
                    let hora = data.toJSON().split("T")[1];
                    req.body.deliveryDate = req.body.deliveryDate.replace(/(\d{4}-\d{2}-\d{2})/gm, "$1") + " " + hora.slice(0, -6);
                    let completionDate;
                    if (req.body.completionDate != "") {
                        completionDate = `completion_date='${req.body.completionDate.replace(/(\d{4}-\d{2}-\d{2})/gm, "$1") + " " + hora.slice(0, -6)}',`;
                    } else {
                        completionDate = ` `;
                    }
                    var sqlCode = `UPDATE service_order SET  owner_information='${req.body.ownerInformation}',    owner_name='${req.body.ownerName}',    description='${req.body.description}',    device_name='${req.body.deviceName}',    delivery_date='${req.body.deliveryDate}', ${completionDate}    status='${req.body.status}',    service_value='${req.body.serviceValue}' WHERE user_id=${userId} AND service_order_id='${req.body.serviceOrderId}' AND senha='${req.body.senha}';`;

                    const connection = mysql.createConnection(mysqlConnection);

                    connection.connect();

                    connection.query((sqlCode), (error, response) => {
                        if (error) {
                            console.log(error); reject(error500);
                        }
                        else resolve();
                    });

                    connection.end();

                })

            }

            editOsResultQuery()
                .then(result => {
                    res.json({
                        erro: false,
                        code: 200,
                        mensagem: "Ordem de serviço atualizada com sucesso"
                    });

                }).catch(error => {
                    res.json(error);
                });

        } catch (error) {

            res.json({
                erro: true,
                code: 500,
                erroDetails: {
                    mensagem: "Ouve um erro em nosso sistema. Tente novamente mais tarde."
                }
            });

        }
    }


}

module.exports = new EditOs();

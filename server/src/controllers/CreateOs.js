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
 * @description Registra uma nova OS
 */
class CreateOs {

    /**
     * @param {object} req Conteúdo da requisição "request"
     * @param {string} req.params.osId  Contém o ID da OS
     * @param {object} req.body Contém as informações para o registro na nova OS
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
    createOsQuery(req, res) {
        const userId = req.userId.id;


        try {


            function createOsResultQuery() {
                return new Promise((resolve, reject) => {
                    const error500 = {
                        erro: true,
                        code: 500,
                        erroDetails: {
                            mensagem: "Ouve um erro em nosso sistema. Tente novamente mais tarde."
                        }
                    }
                    var code = new osCodeFactory();
                    code.newOsCode().then(result => {
                        if (!result[0]) {
                            console.log("error");
                            reject(error500);
                        }
                        else {
                            let data = new Date();
                            let hora = data.toJSON().split("T")[1];
                            req.body.deliveryDate = req.body.deliveryDate.replace(/(\d{4}-\d{2}-\d{2})/gm, "$1") + " " + hora.slice(0, -6);
                            let completionDateCampo, completionDateValue;
                            if (req.body.completionDate != "") {
                                completionDateCampo = `\`completion_date\`,`;
                                completionDateValue = `'${req.body.completionDate.replace(/(\d{4}-\d{2}-\d{2})/gm, "$1") + " " + hora.slice(0, -6)}',`;
                            } else {
                                completionDateCampo = ` `;
                                completionDateValue = ` `;
                            }
                            var sqlCode = `INSERT INTO\`service_order\`(    \`service_order_id\`,    \`user_id\`,    \`senha\`,    \`owner_information\`,    \`owner_name\`,    \`description\`,    \`device_name\`,    \`delivery_date\`,    ${completionDateCampo}    \`status\`,    \`service_value\`) VALUES(    '${result[1]}',    '${userId}',    '${req.body.senha}',    '${req.body.ownerInformation}',    '${req.body.ownerName}',    '${req.body.description}',    '${req.body.deviceName}',    '${req.body.deliveryDate}',    ${completionDateValue}   '${req.body.status}',    '${req.body.serviceValue}');`;

                            const connection = mysql.createConnection(mysqlConnection);

                            connection.connect();

                            connection.query((sqlCode), (error, response) => {
                                if (error) {
                                    console.log(error); reject(error500);
                                }

                                else
                                    resolve([result[1], req.body.senha]);



                            });

                            connection.end();
                        }
                    })

                });
            }

            createOsResultQuery()
                .then(result => {
                    res.json({
                        erro: false,
                        code: 200,
                        mensagem: "Ordem de serviço criada com sucesso",
                        osCode: result[0],
                        osSenha: result[1]
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

module.exports = new CreateOs();

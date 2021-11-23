const mysql = require('mysql');
const mysqlConnection = require('../database/connection');
const fs = require('fs')
const definitions = require('../assets/definitions.json');
const validateInformation = require('../Model/validateInformation');
const osCodeFactory = require('../Model/osCodeFactory');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(definitions.bcryptSalt);

class CreateOs {
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
                            req.body.completionDate = req.body.completionDate.replace(/(\d{4}-\d{2}-\d{2})/gm, "$1") + " " + hora.slice(0, -6);

                            var sqlCode = `INSERT INTO\`service_order\`(    \`service_order_id\`,    \`user_id\`,    \`senha\`,    \`owner_information\`,    \`owner_name\`,    \`description\`,    \`device_name\`,    \`delivery_date\`,    \`completion_date\`,    \`status\`,    \`service_value\`) VALUES(    '${result[1]}',    '${userId}',    '${req.body.senha}',    '${req.body.ownerInformation}',    '${req.body.ownerName}',    '${req.body.description}',    '${req.body.deviceName}',    '${req.body.deliveryDate}',    '${req.body.completionDate}',    '${req.body.status}',    '${req.body.serviceValue}');`;

                            const connection = mysql.createConnection(mysqlConnection);

                            connection.connect();

                            connection.query((sqlCode), (error, response) => {
                                if (error) {
                                    console.log(error); reject(error500);
                                }

                                else
                                    resolve();



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
                        mensagem: "Ordem de serviço criada com sucesso"
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

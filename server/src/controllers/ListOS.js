const mysql = require('mysql');
const mysqlConnection = require('../database/connection');
const definitions = require('../assets/definitions.json');
const advancedSearch = require('../Model/advancedSearchManager');

class ListOS {
    listarOSQuery(req, res) {
        const userId = req.userId.id;
        const page = req.params.page;
        const params = req.query;
        const error500 = {
            erro: true,
            code: 500,
            erroDetails: {
                mensagem: "Ouve um erro em nosso sistema. Tente novamente mais tarde."
            }
        }

        function registerResultQuery() {
            return new Promise((resolve, reject) => {

                const connection = mysql.createConnection(mysqlConnection);

                connection.connect();

                let getCondision = new advancedSearch(params);
                var sqlCondision = getCondision.getSqlCondision;


                connection.query(`select service_order_id from service_order where user_id=${userId} ${sqlCondision};`, (error, response) => {
                    if (error) { reject(error500); }
                    else {
                        var amountResponse = response.length;

                        if (amountResponse >= 1) {

                            let pages = amountResponse / params.break;
                            var numberOfPages = Math.round(pages);
                            if (pages > numberOfPages) numberOfPages++;



                            if (page > 0 && page <= numberOfPages) {

                                var gapEnd, gapInit;
                                gapEnd = params.break * page;
                                gapInit = gapEnd - params.break;

                                const connection = mysql.createConnection(mysqlConnection);

                                connection.connect();
                                let values = 'service_order_id, senha, owner_name, device_name, delivery_date, completion_date, status, service_value'
                                connection.query(`select ${values} from service_order where user_id=${userId} ${sqlCondision} LIMIT ${gapInit},${gapEnd};`, (error, response) => {
                                    if (error) { reject(error500); }
                                    else {
                                        resolve([numberOfPages, parseInt(page), parseInt(params.break), parseInt(params.filterType), JSON.parse(JSON.stringify(response))])
                                    }
                                });

                                connection.end();





                            } else resolve([numberOfPages, 0, params.break, params.filterType, []])

                        } else resolve([numberOfPages, 0, params.break, params.filterType, []])
                    }

                });

                connection.end();
                // resolve()
            });
        }

        registerResultQuery()
            .then(result => {

                var resJson = {
                    erro: false,
                    code: 200,
                    filterType: result[3],
                    numberOfPages: result[0],
                    page: result[1],
                    break: result[2],
                    liste: []
                }

                for (let i = 0; i < result[2]; i++) {
                    if (result[4].length > i) resJson.liste[i] = result[4][i];
                    else resJson.liste[i] = {
                        service_order_id: "",
                        senha: "",
                        owner_name: "",
                        device_name: "",
                        delivery_date: "",
                        completion_date: "",
                        status: "",
                        service_value: ""
                    };
                }
                res.json(resJson);

            }).catch(error => {
                res.json(error);
            });
    }
}
module.exports = new ListOS();
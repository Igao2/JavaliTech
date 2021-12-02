const mysql = require('mysql');
const mysqlConnection = require('../database/connection');
const fs = require('fs')
const definitions = require('../assets/definitions.json');

class OsValidate {
    validateQuery(req, res) {
        const codeId = req.params.osId;
        const osPass = req.params.osPass;

        function validateResultQuery() {
            return new Promise((resolve, reject) => {
                const connection = mysql.createConnection(mysqlConnection);

                connection.connect();

                connection.query((`SELECT senha FROM service_order WHERE service_order_id='${codeId}';`), (error, osInformation) => {
                    if (error)
                        reject(500);

                    osInformation = JSON.parse(JSON.stringify(osInformation));

                    if (osInformation.length != 1)
                        reject(417);

                    else {

                        if (osInformation[0].senha == osPass) resolve(200);
                        else reject(401);

                    }
                });
                connection.end();
            });
        }

        validateResultQuery().then(result => { res.json(result) }).catch(error => { res.json(error) });
    }
}

module.exports = new OsValidate();

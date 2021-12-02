const mysql = require('mysql');
const mysqlConnection = require('../database/connection');

module.exports = class osCodeFactory {

    newOsCode() {
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        const asyncLoop = async () => {
            let code = "";
            let loop = true;
            do {
                code = "";

                for (var i = 0; i < 6; i++)
                    code += possible.charAt(Math.floor(Math.random() * possible.length));

                var finalCode = await new Promise(resolve => {

                    const connection = mysql.createConnection(mysqlConnection);

                    connection.connect();

                    connection.query(`SELECT service_order_id FROM service_order WHERE service_order_id='${code}';`, (error, response) => {
                        if (error) { resolve([false, "/javalitech"]) }
                        else {
                            if (response.length != 0) resolve([true, "/javalitech"]);
                            else resolve([false, code]);
                        }
                    });

                    connection.end();
                });

                loop = finalCode[0];

            } while (loop)

            if (finalCode[1] == "/javalitech") return [false, "/javalitech"];
            else return [true, finalCode[1]];
        }

        return asyncLoop();
    }
}


const mysql = require('mysql');
const mysqlConnection = require('../database/connection');
const fs = require('fs')
const definitions = require('../assets/definitions.json');

class OsInfos {
    osInfosQuery(req, res) {
        const codeId = req.params.osId;
        const osPass = req.params.osPass;

        function osInfosResultQuery() {
            return new Promise((resolve, reject) => {
                const connection = mysql.createConnection(mysqlConnection);

                connection.connect();

                connection.query((`SELECT * FROM service_order WHERE service_order_id='${codeId}' AND senha='${osPass}';`), (error, osInformation) => {
                    if (error) { console.log(error); reject(500); }

                    osInformation = JSON.parse(JSON.stringify(osInformation));

                    if (osInformation.length != 1)
                        reject(204);

                    else {

                        const connection = mysql.createConnection(mysqlConnection);

                        connection.connect();

                        connection.query((`SELECT name, email, photo, address, telephone  FROM user WHERE id='${osInformation[0].user_id}';`), (error, userInformation) => {
                            if (error) { console.log(error); reject(500); }

                            userInformation = JSON.parse(JSON.stringify(userInformation));

                            if (osInformation.length != 1)
                                reject(417);

                            else
                                resolve([osInformation[0], userInformation[0]])
                        });

                        connection.end();
                    }
                });
                connection.end();
            });
        }

        osInfosResultQuery()
            .then(result => {

                var resultJson = {};
                resultJson.service_order_id = result[0].service_order_id;
                resultJson.senha = result[0].senha;
                resultJson.owner_name = result[0].owner_name;
                resultJson.owner_information = result[0].owner_information;
                resultJson.description = result[0].description;
                resultJson.device_name = result[0].device_name;
                resultJson.delivery_date = result[0].delivery_date;
                resultJson.completion_date = result[0].completion_date;
                resultJson.status = result[0].status;
                resultJson.service_value = result[0].service_value;
                resultJson.user_name = result[1].name;
                resultJson.user_email = result[1].email;
                resultJson.user_address = JSON.parse(result[1].address);
                resultJson.user_telephone = result[1].telephone;

                let userPhoto = JSON.parse(result[1].photo);

                if (fs.existsSync("./public/userImages/" + userPhoto.name)) {
                    userPhoto.name = definitions.projectServerUrl + "userImages/" + userPhoto.name;

                    resultJson.user_photo = [userPhoto.name, userPhoto.imageSetting];
                } else {
                    userPhoto.name = definitions.projectServerUrl + "userImages/standard_photo.png";
                    userPhoto.imageSetting = "";
                    resultJson.user_photo = [userPhoto.name, userPhoto.imageSetting];
                }

                res.json(resultJson)
            }).catch(error => {
                res.json(error)
            });
    }
}

module.exports = new OsInfos();

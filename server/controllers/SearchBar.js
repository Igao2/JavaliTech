const mysql = require('mysql');
const mysqlConnection = require('../database/connection');
const fs = require('fs')
const definitions = require('../assets/definitions.json');

class SearchBar {
    searchQuery(req, res) {
        const codeId = req.params.osId;

        function searchResultQuery(codeId) {
            return new Promise((resolve, reject) => {
                const connection = mysql.createConnection(mysqlConnection);

                connection.connect();

                connection.query(('SELECT service_order_id, user_id, owner_name, description, device_photos, delivery_date, completion_date, status, service_value  FROM service_order WHERE service_order_id="' + codeId + '";'), (error, osInformation) => {
                    if (error)
                        reject(500);
                    osInformation = JSON.parse(JSON.stringify(osInformation));

                    if (osInformation.length != 1)
                        reject(204);

                    else {

                        const connection = mysql.createConnection(mysqlConnection);

                        connection.connect();

                        connection.query(('SELECT `name`, `photo`  FROM user WHERE id="' + osInformation[0].user_id + '";'), (error, userInformation) => {
                            if (error)
                                reject(500);

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

        searchResultQuery(codeId)
            .then(result => {

                var resultJson = {};
                resultJson.service_order_id = result[0].service_order_id;
                resultJson.owner_name = result[0].owner_name;
                resultJson.description = result[0].description;
                resultJson.device_photos = JSON.parse(result[0].device_photos);
                resultJson.delivery_date = result[0].delivery_date;
                resultJson.completion_date = result[0].completion_date;
                resultJson.status = result[0].status;
                resultJson.service_value = result[0].service_value;
                resultJson.user_name = result[1].name;

                let userPhoto = JSON.parse(result[1].photo);

                if (fs.existsSync("./public/userImages/" + userPhoto.nome)) {
                    userPhoto.nome = definitions.projectServerUrl + "userImages/" + userPhoto.nome;
                    resultJson.user_photo = userPhoto;
                } else {
                    userPhoto.nome = definitions.projectServerUrl + "userImages/standard_photo.png";
                    userPhoto.ajuste = "";
                    resultJson.user_photo = userPhoto;
                }


                res.json(resultJson)
            }).catch(error => {
                res.json(error)
            });
    }
}

module.exports = new SearchBar();

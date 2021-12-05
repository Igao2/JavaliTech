const mysql = require('mysql');
const mysqlConnection = require('../database/connection');
const fs = require('fs')
const definitions = require('../assets/definitions.json');

/**
 * @async
 * @class
 * @description Retorna informações básicas do usuário
 */
class UserInfos {
    /**
     * @param {object} req Conteúdo da requisição "request"
     * @param {string} req.userId.id Contém o ID do usuario
     * @param {object} res "response"
     */
    UserInfosQuery(req, res) {
        const userId = req.userId.id;

        function searchResultQuery(codeId) {
            return new Promise((resolve, reject) => {


                const connection = mysql.createConnection(mysqlConnection);

                connection.connect();
                connection.query((`SELECT name, email, photo, address, telephone FROM user WHERE id=${userId};`), (error, userInformation) => {
                    if (error)
                        reject(500);

                    userInformation = JSON.parse(JSON.stringify(userInformation));

                    if (userInformation.length != 1)
                        reject(417);

                    else
                        resolve(userInformation[0])
                });

                connection.end();


            });
        }

        searchResultQuery()
            .then(result => {
                var resultJson = {};
                resultJson.name = result.name;
                resultJson.email = result.email;
                resultJson.address = JSON.parse(result.address);
                resultJson.telephone = result.telephone;

                resultJson.photo = result.photo;

                let userPhoto = JSON.parse(result.photo);

                if (fs.existsSync("./public/userImages/" + userPhoto.name)) {
                    userPhoto.name = definitions.projectServerUrl + "userImages/" + userPhoto.name;

                    resultJson.photo = [userPhoto.name, userPhoto.imageSetting];
                } else {
                    userPhoto.name = definitions.projectServerUrl + "userImages/standard_photo.png";
                    userPhoto.imageSetting = {
                        left: "0",
                        top: "0",
                        width: "100"
                    };
                    resultJson.photo = [userPhoto.name, userPhoto.imageSetting];
                }

                res.json(resultJson)
            }).catch(error => {
                res.json(error)
            });
    }
}

module.exports = new UserInfos();

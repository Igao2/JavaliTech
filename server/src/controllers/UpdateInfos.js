const mysql = require('mysql');
const mysqlConnection = require('../database/connection');
const fs = require('fs')
const definitions = require('../assets/definitions.json');
const validateInformation = require('../Model/validateInformation');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(definitions.bcryptSalt);

class UserInfos {
    imageSetting(req, res) {
        const userId = req.userId.id;

        function imageSettingQuery() {
            return new Promise((resolve, reject) => {


                const connection = mysql.createConnection(mysqlConnection);
                const error505 = {
                    erro: true,
                    code: 500,
                    mensagem: "Ouve um erro em nosso sistema. Tente novamente mais tarde."
                };

                connection.connect();

                connection.query((`SELECT photo FROM user WHERE id=${userId};`), (error, userInformation) => {
                    if (error) reject(error505);

                    userInformation = JSON.parse(JSON.stringify(userInformation));

                    if (userInformation.length != 1) reject({
                        erro: true,
                        code: 417,
                        mensagem: "Expectation Failed."
                    });
                    else {

                        let userPhoto = JSON.parse(userInformation[0].photo);

                        userPhoto.imageSetting = req.body.imageSetting;

                        const connection = mysql.createConnection(mysqlConnection);

                        connection.connect();

                        connection.query((`UPDATE user SET photo='${JSON.stringify(userPhoto)}' WHERE id=${userId};`), (error, response) => {
                            if (error) reject(error505);
                            else resolve();
                        });

                        connection.end();

                    }

                });

                connection.end();


            });
        }

        imageSettingQuery()
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

    image(req, res) {
        const userId = req.userId.id;
        const formInputs = JSON.parse(req.body.formInputs);

        try {

            if (req.file) {

                const temporaryPath = req.file.path;

                function imageQuery() {
                    return new Promise((resolve, reject) => {


                        const connection = mysql.createConnection(mysqlConnection);
                        const error505 = {
                            erro: true,
                            code: 500,
                            mensagem: "Ouve um erro em nosso sistema. Tente novamente mais tarde."
                        };

                        connection.connect();

                        connection.query((`SELECT photo FROM user WHERE id=${userId};`), (error, userInformation) => {
                            if (error) reject(error505);

                            userInformation = JSON.parse(JSON.stringify(userInformation));

                            if (userInformation.length != 1) reject({
                                erro: true,
                                code: 417,
                                mensagem: "Expectation Failed."
                            });
                            else {

                                let userPhoto = JSON.parse(userInformation[0].photo);

                                userPhoto.imageSetting = formInputs.imageSetting;

                                let targetPath = '../server/public/userImages/' + userPhoto.name;

                                const connection = mysql.createConnection(mysqlConnection);

                                connection.connect();

                                connection.query((`UPDATE user SET photo='${JSON.stringify(userPhoto)}' WHERE id=${userId};`), (error, response) => {
                                    if (error) reject(error505);
                                    else {
                                        var src = fs.createReadStream(temporaryPath);
                                        var dest = fs.createWriteStream(targetPath);
                                        src.pipe(dest);
                                        src.on('end', function () {
                                            fs.unlink('./' + temporaryPath, () => { resolve() })
                                        });
                                        src.on('error', function (err) {
                                            fs.unlink('./' + temporaryPath, () => {
                                                reject({
                                                    erro: true,
                                                    code: 400,
                                                    mensagem: "A imagens não pode ser atualizada. Tente novamente mais tarde."
                                                })
                                            })
                                        });
                                        resolve()
                                    };
                                });

                                connection.end();

                            }

                        });

                        connection.end();


                    });
                }

                imageQuery()
                    .then(result => {
                        res.json({
                            erro: false,
                            code: 200,
                            mensagem: "Alteração realizada com sucesso"
                        })
                    }).catch(error => {
                        res.json(error)
                    });

            } else res.json({
                erro: true,
                code: 400,
                mensagem: "A atualização não foi sucedido, é necessário enviar uma imagem PNG ou JPG!"
            });
        } catch (error) {
            fs.unlink('./' + temporaryPath, () => {
                res.json({
                    erro: true,
                    code: 500,
                    mensagem: "Ouve um erro em nosso sistema. Tente novamente mais tarde."
                });
            })
        }
    }

    email(req, res) {
        const userId = req.userId.id;

        function emailQuery() {
            return new Promise((resolve, reject) => {
                var validate = new validateInformation({
                    email: req.body.email,
                    type: 1
                });
                let valida = validate.checkForParams;

                if (valida.erro) {
                    reject(valida)
                } else {

                    const connection = mysql.createConnection(mysqlConnection);

                    const error505 = {
                        erro: true,
                        code: 500,
                        mensagem: "Ouve um erro em nosso sistema. Tente novamente mais tarde."
                    };

                    connection.connect();
                    connection.query((`SELECT id FROM user WHERE id<>${userId} AND email='${req.body.email}';`), (error, userInformation) => {
                        if (error) reject(error505);

                        userInformation = JSON.parse(JSON.stringify(userInformation));

                        if (userInformation.length >= 1) reject({
                            erro: true,
                            code: 400,
                            mensagem: "O email inserido já existe."
                        });
                        else {

                            const connection = mysql.createConnection(mysqlConnection);

                            connection.connect();

                            connection.query((`UPDATE user SET email='${req.body.email}' WHERE id=${userId};`), (error, response) => {
                                if (error) reject(error505);
                                else resolve();
                            });

                            connection.end();

                        }

                    });

                    connection.end();
                }
            });


        }

        emailQuery()
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

    dados(req, res) {
        const userId = req.userId.id;

        function dadosQuery() {
            return new Promise((resolve, reject) => {

                var errors = {
                    erro: false,
                    code: 400,
                    erroDetails: []
                }
                if (req.body.address.rua == "") {
                    errors.erro = true;
                    errors.erroDetails.push({
                        campo: "rua",
                        mensagem: "O campo 'rua' esta vazio."
                    })
                }
                if (req.body.address.bairro == "") {
                    errors.erro = true;
                    errors.erroDetails.push({
                        campo: "bairro",
                        mensagem: "O campo 'bairro' esta vazio."
                    })
                }
                if (req.body.address.cidade == "") {
                    errors.erro = true;
                    errors.erroDetails.push({
                        campo: "cidade",
                        mensagem: "O campo 'cidade' esta vazio."
                    })
                }
                if (req.body.address.estado == "") {
                    errors.erro = true;
                    errors.erroDetails.push({
                        campo: "estado",
                        mensagem: "O campo 'estado' esta vazio."
                    })
                }
                if (req.body.address.cep == "") {
                    errors.erro = true;
                    errors.erroDetails.push({
                        campo: "cep",
                        mensagem: "O campo 'cep' esta vazio."
                    })
                }

                var validateTelephone = new validateInformation({
                    telephone: req.body.telephone,
                    type: 3
                });

                var validateName = new validateInformation({
                    name: req.body.name,
                    type: 4
                });

                let valida = [validateTelephone.checkForParams, validateName.checkForParams];
                if (valida[0].erro || valida[1].erro || errors.erro) {

                    if (valida[0].erro) {
                        errors.erro = true;
                        errors.erroDetails.push({
                            campo: "telephone",
                            mensagem: valida[0].mensagem
                        });
                    }

                    if (valida[1].erro) {
                        errors.erro = true;
                        errors.erroDetails.push({
                            campo: "name",
                            mensagem: valida[1].mensagem
                        });
                    }

                    reject(errors)
                } else {


                    const connection = mysql.createConnection(mysqlConnection);

                    const error505 = {
                        erro: true,
                        code: 500,
                        mensagem: "Ouve um erro em nosso sistema. Tente novamente mais tarde."
                    };

                    connection.connect();

                    connection.query((`UPDATE user SET name='${req.body.name}', address='${JSON.stringify(req.body.address)}', telephone='${req.body.telephone}' WHERE id=${userId};`), (error, userInformation) => {
                        if (error) reject(error505);
                        else resolve();
                    });

                    connection.end();
                }
            });


        }

        dadosQuery()
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

    senha(req, res) {
        const userId = req.userId.id;

        function dadosQuery() {
            return new Promise((resolve, reject) => {


                const connection = mysql.createConnection(mysqlConnection);

                const error505 = {
                    erro: true,
                    code: 500,
                    mensagem: "Ouve um erro em nosso sistema. Tente novamente mais tarde."
                };
                let password = bcrypt.hashSync(req.body.password, salt);

                connection.connect();

                connection.query((`UPDATE user SET password='${password}' WHERE id=${userId};`), (error, userInformation) => {
                    if (error) reject(error505);
                    else resolve();
                });

                connection.end();

            });


        }

        dadosQuery()
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

    deleteUser(req, res) {
        const userId = req.userId.id;

        function dadosQuery() {
            return new Promise((resolve, reject) => {


                const connection = mysql.createConnection(mysqlConnection);

                const error505 = {
                    erro: true,
                    code: 500,
                    mensagem: "Ouve um erro em nosso sistema. Tente novamente mais tarde."
                };

                connection.connect();
                connection.query((`SELECT photo FROM user WHERE id=${userId};`), (error, userInformation) => {
                    if (error) reject(error505);
                    else {
                        userInformation = JSON.parse(JSON.stringify(userInformation));
                        userInformation = JSON.parse(userInformation[0].photo)
                        if (fs.existsSync("./public/userImages/" + userInformation.name)) {
                            fs.unlinkSync("./public/userImages/" + userInformation.name)
                        }

                        const connection = mysql.createConnection(mysqlConnection);
                        connection.connect();

                        connection.query((`SELECT user_id FROM service_order WHERE user_id=${userId};`), (error, queryResolve) => {
                            if (error) reject(error505);
                            else {
                                if (queryResolve.length != 0) {
                                    const connection = mysql.createConnection(mysqlConnection);
                                    connection.connect();
                                    connection.query((`DELETE FROM service_order WHERE user_id=${userId};`), (error, queryResolve) => {
                                        if (error) reject(error505);
                                        else {
                                            const connection = mysql.createConnection(mysqlConnection);
                                            connection.connect();
                                            connection.query((`DELETE FROM user WHERE id=${userId};`), (error, queryResolve) => {
                                                if (error) { console.log(error); reject(error505); }
                                                else {
                                                    resolve()
                                                }
                                            });
                                            connection.end();
                                        }
                                    });
                                    connection.end();
                                }
                                else {
                                    const connection = mysql.createConnection(mysqlConnection);
                                    connection.connect();
                                    connection.query((`DELETE FROM user WHERE id=${userId};`), (error, queryResolve) => {
                                        if (error) reject(error505);
                                        else {
                                            resolve()
                                        }
                                    });
                                    connection.end();
                                }
                            }
                        });

                        connection.end();
                    }
                });
                connection.end();

            });


        }

        dadosQuery()
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

module.exports = new UserInfos();

const mysql = require('mysql');
const mysqlConnection = require('../database/connection');
const fs = require('fs')
const definitions = require('../assets/definitions.json');
const validateInformation = require('../Model/validateInformation');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(definitions.bcryptSalt);

class Register {
    registerQuery(req, res) {

        const formInputs = JSON.parse(req.body.formInputs);

        try {

            if (req.file) {

                const temporaryPath = req.file.path;

                function searchResultQuery(formInputs) {
                    return new Promise((resolve, reject) => {

                        var validate = new validateInformation(formInputs);
                        let valida = validate.check;

                        if (valida.erro) {
                            reject(valida)
                        } else {
                            const connection = mysql.createConnection(mysqlConnection);

                            connection.connect();

                            connection.query((`SELECT email FROM user WHERE email='${formInputs.email}';`), (error, response) => {
                                if (error)
                                    reject({
                                        erro: true,
                                        code: 500,
                                        erroDetails: {
                                            mensagem: "Ouve um erro em nosso sistema. Tente novamente mais tarde."
                                        }
                                    });

                                if (response.length != 0)
                                    reject({
                                        erro: true,
                                        code: 400,
                                        erroDetails: [{
                                            campo: "email",
                                            mensagem: "O email inserido já existe."
                                        }]
                                    });

                                else {

                                    var targetPath, namePath;
                                    let data = new Date();
                                    var pathExtension = () => {
                                        let extension = req.file.originalname.split(".");
                                        return extension[(extension.length - 1)]
                                    }

                                    do {
                                        namePath = data.toJSON().replace(/([0-9-]+)T([0-9]+):([0-9]+)(\S+)/, "$1_$2-$3") + "_" + (Math.floor(Math.random() * (9 - 1)) + 1) + "." + pathExtension();
                                        targetPath = '../server/public/userImages/' + namePath;
                                    } while (fs.existsSync(targetPath));

                                    let photo = {
                                        nome: namePath,
                                        ajuste: formInputs.ajuste
                                    }

                                    let password = bcrypt.hashSync(formInputs.password, salt);

                                    let sqlCode = `INSERT INTO \`user\`(\`name\`,\`email\`,\`password\`,\`photo\`,\`address\`,\`telephone\`) VALUES('${formInputs.name}','${formInputs.email}','${password}','${JSON.stringify(photo)}','${JSON.stringify(formInputs.address)}','${formInputs.telephone}'                                    );`

                                    const connection = mysql.createConnection(mysqlConnection);

                                    connection.connect();

                                    connection.query((sqlCode), (error, response) => {
                                        if (error) {
                                            console.log(error)
                                            reject({
                                                erro: true,
                                                code: 500,
                                                erroDetails: {
                                                    mensagem: "Ouve um erro em nosso sistema. Tente novamente mais tarde."
                                                }
                                            });
                                        }
                                        else {
                                            var src = fs.createReadStream(temporaryPath);
                                            var dest = fs.createWriteStream(targetPath);
                                            src.pipe(dest);
                                            src.on('end', function () {
                                                fs.unlink('./' + temporaryPath, () => { resolve() })
                                            });
                                            src.on('error', function (err) {
                                                fs.unlink('./' + temporaryPath, () => { resolve() })
                                            });
                                        }


                                    });

                                    connection.end();
                                }
                            });
                            connection.end();
                        }
                    });
                }

                searchResultQuery(formInputs)
                    .then(result => {
                        res.json({
                            erro: false,
                            code: 200,
                            mensagem: "Cadastro realizado com sucesso"
                        });

                    }).catch(error => {
                        fs.unlink('./' + temporaryPath, () => { res.json(error); })
                    });
            } else res.json({
                erro: true,
                code: 400,
                erroDetails: [{
                    campo: "image",
                    mensagem: "Upload não foi sucedido, necessário enviar uma imagem PNG ou JPG!"
                }]
            });



        } catch (error) {
            fs.unlink('./' + temporaryPath, () => {
                res.json({
                    erro: true,
                    code: 500,
                    erroDetails: {
                        mensagem: "Ouve um erro em nosso sistema. Tente novamente mais tarde."
                    }
                });
            })
        }
    }


}

module.exports = new Register();

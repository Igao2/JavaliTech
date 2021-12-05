/**
 * @module Model-validateInformation
 * @description verifica o tamanho, formato e tipo das informações
 * @param {object} info - informações a serem validadas.
 * @param {number} info.type - define qual informação sera conferida.
 * @param {string} info.name - nome do usuario.
 * @param {string} info.email - email do usuario.
 * @param {string} info.password - senha do usuario.
 * @param {string} info.telephone - telefone do usuario.
 */
module.exports = class validateInformation {
    constructor(info) {
        this.type = info.type
        this.name = info.name;
        this.email = info.email;
        this.password = info.password;
        this.telephone = info.telephone;
    }


    get checkAll() {
        let errors = {
            erro: false,
            code: 400,
            erroDetails: []
        }

        if (!this.checkEmail(this.email)) {
            errors.erro = true;
            errors.erroDetails.push({
                campo: "email",
                mensagem: "Formato de Email invalido."
            })
        }

        if (!this.checkTelephone(this.telephone)) {
            errors.erro = true;
            errors.erroDetails.push({
                campo: "telephone",
                mensagem: "Formato de Telefone invalido."
            })
        }

        if (!this.checkPassword(this.password)) {
            errors.erro = true;
            errors.erroDetails.push({
                campo: "password",
                mensagem: "Tamanho de senha invalida."
            })
        }

        if (!this.checkNameFormat(this.name)) {
            errors.erro = true;
            errors.erroDetails.push({
                campo: "name",
                mensagem: "Formato de nome invalido."
            })
        } else if (!this.checkName(this.name)) {
            errors.erro = true;
            errors.erroDetails.push({
                campo: "name",
                mensagem: "Nome muito longo."
            })
        }

        return errors;
    }

    get checkLogin() {
        let errors = {
            erro: false,
            code: 400,
            erroDetails: []
        }

        if (!this.checkEmail(this.email)) {
            errors.erro = true;
            errors.erroDetails.push({
                campo: "email",
                mensagem: "Formato de Email invalido."
            })
        }

        if (!this.checkPassword(this.password)) {
            errors.erro = true;
            errors.erroDetails.push({
                campo: "password",
                mensagem: "Tamanho de senha invalida."
            })
        }

        return errors;
    }

    get checkForParams() {

        var errors = {
            erro: false
        };

        switch (this.type) {
            case 1:
                if (!this.checkEmail(this.email)) {
                    errors = {
                        erro: true,
                        code: 400,
                        mensagem: "Formato de Email invalido."
                    }
                }
                break;
            case 2:
                if (!this.checkPassword(this.password)) {
                    errors = {
                        erro: true,
                        code: 400,
                        mensagem: "Tamanho de senha invalida."
                    }
                }
                break;
            case 3:
                if (!this.checkTelephone(this.telephone)) {
                    errors = {
                        erro: true,
                        code: 400,
                        mensagem: "Formato de Telefone invalido."
                    }
                }
                break;
            case 4:
                if (!this.checkNameFormat(this.name)) {
                    errors = {
                        erro: true,
                        code: 400,
                        mensagem: "Formato de nome invalido."
                    }
                } else if (!this.checkName(this.name)) {
                    errors = {
                        erro: true,
                        code: 400,
                        mensagem: "Nome muito longo."
                    }
                }
                break;
        }

        return errors;
    }

    checkEmail(email) {
        var re = /\S+@\S+\.\S+/;

        if (re.test(email)) {

            var splitEmail = email.split('@');
            var splitEmailString = [3];
            splitEmailString[0] = splitEmail[0];
            splitEmail = splitEmail[1].split('.');
            splitEmailString[1] = splitEmail[0];
            splitEmailString[2] = splitEmail[1];

            let valid = true;
            var re = /[Á-źá-ź.,~!@#$%&_? -]/gm;

            for (let i = 0; i < splitEmailString.length; i++)
                if (re.test(splitEmailString[i])) valid = false;

            if (valid) return true;
            else return false;

        } else return false;
    }

    checkTelephone(telephone) {
        if (telephone.length > 15)
            return false;
        var re = /\(\d{2}\) (\d{5}|\d{4})-\d{4}$/gm;
        return re.test(telephone);
    }

    checkPassword(password) {
        if (password.length <= 0) return false;
        else return true;
    }

    checkNameFormat(name) {
        if (!isNaN(name)) return false;
        else return true;
    }

    checkName(name) {
        if (name.length > 150) return false;
        else return true;
    }

}

module.exports

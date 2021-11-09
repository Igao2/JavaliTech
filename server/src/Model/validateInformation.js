module.exports = class validateInformation {
    constructor(info) {
        this.name = info.name;
        this.email = info.email;
        this.password = info.password;
        this.telephone = info.telephone;
    }

    get check() {
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
                mensagem: "Formato de namo invalido."
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


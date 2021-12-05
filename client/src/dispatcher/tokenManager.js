import Cookies from 'universal-cookie';
const cookies = new Cookies();

const nameCookie = "token";

/**
 * @function AppDispatcher-tokenManager-addDays
 * @description Avança uma uma dada por determinados dias
 * @param {number} days Contém a quantidade de dias a serem avançados
 */
Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

const date = new Date();

/**
 * @function AppDispatcher-tokenManager-createToken
 * @description Armazena o token em um cookie
 * @param {string} token Contém o ID da OS
 */
export const createToken = (token) => {
    cookies.set(nameCookie, token, {
        path: "/",
        expires: date.addDays(7)
    })
};

/**
 * @function AppDispatcher-tokenManager-readToken
 * @description Le o token no cookie
 * @returns {string} retorna um JWT
 */
export const readToken = () => {
    return cookies.get(nameCookie, { path: "/" })
};

/**
 * @function AppDispatcher-tokenManager-deleteToken
 * @description Deleta o cookie com o token
 */
export const deleteToken = () => {
    cookies.remove(nameCookie, { path: "/" })
};

/**
 * @function AppDispatcher-tokenManager-checkToken
 * @description Verifica se o cookie com token existe
 * @returns {boolean} "true" se o cookie existe, "false" se o cookie não existe
 */
export const checkToken = () => {
    if (cookies.get(nameCookie, { path: "/" })) return true;
    else return false;
};

import Cookies from 'universal-cookie';
const cookies = new Cookies();

const nameCookie = "token";

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

const date = new Date();

export const createToken = (token) => {
    cookies.set(nameCookie, token, {
        path: "/",
        expires: date.addDays(7)
    })
};

export const readToken = () => {
    return cookies.get(nameCookie, { path: "/" })
};

export const deleteToken = () => {
    cookies.remove(nameCookie, { path: "/" })
};

export const checkToken = () => {
    if (cookies.get(nameCookie, { path: "/" }))
        return true;
    else
        return false;
};






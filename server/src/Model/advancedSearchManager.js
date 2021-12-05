/**
 * @module Model-advancedSearch
 * @description cria a condição para a busca de OS
 * @param {object} filter - informações para o filtro de pesquisa.
 * @param {string} filter.filterType - tipo de filtragen.
 * @param {string} filter.dado - dados da filtragen.
 * @returns {string}
 */
module.exports = class advancedSearch {

    constructor(filter) {
        this.filter = filter;
    }

    get getSqlCondision() {
        switch (this.filter.filterType) {
            case '0': return " "; break;
            case '1': return this.searchForWaitOS(); break;
            case '2': return this.searchForFinishOS(); break;
            case '3': return this.searchForInitOS(); break;
            case '4': return this.searchForPauseOS(); break;
            case '5': return this.searchForOwnerNameOS(); break;
            case '6': return this.searchForDeviceNameOS(); break;
            case '7': return this.searchForDeliveryDateOS(); break;
            case '8': return this.searchForServiceValueOS(); break;
            default: console.log(this.filter); return " ";
        }
    }

    searchForWaitOS() {
        return "AND status=0";
    }
    searchForFinishOS() {
        return "AND status=1";
    }
    searchForInitOS() {
        return "AND status=2";
    }
    searchForPauseOS() {
        return "AND status=3";
    }
    searchForOwnerNameOS() {
        return `AND owner_name LIKE '${this.filter.dado}%'`;
    }
    searchForDeviceNameOS() {
        return `AND device_name LIKE '${this.filter.dado}%'`;
    }
    searchForDeliveryDateOS() {
        return `AND delivery_date LIKE '%${this.filter.dado}%'`;
    }
    searchForServiceValueOS() {
        return `AND ABS(service_value-${this.filter.dado}) < 0.001`;
    }
}
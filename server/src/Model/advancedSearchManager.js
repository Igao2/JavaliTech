module.exports = class advancedSearch {
    constructor(filter) {
        this.filter = filter;
    }
    get getSqlCondision() {
        switch (this.filter.filterType) {
            case '0':
                return " ";
                break;
            case '1':
                return this.searchForIncompleteOS();
                break;
            case '2':
                return this.searchForCompleteOS();
                break;
        }
    }

    searchForIncompleteOS() {
        return "AND status=0";
    }
    searchForCompleteOS() {
        return "AND status=1";
    }
}
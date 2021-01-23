const LocalizationsDAO = require('./localization.dao');

class LocalizationSerivce {
    constructor() {
        this.dao = new LocalizationsDAO();
    }

    getUFList = async () => {
        return this.dao.getUFList();
    }

    getCityListByUF = async (UF) => {
        return this.dao.getCityListByUF(UF);
    }
}

module.exports = LocalizationSerivce;
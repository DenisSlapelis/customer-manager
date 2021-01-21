const LocalizationsDAO = require('./localization.dao');

class LocalizationSerivce {
    constructor() {
        this.dao = new LocalizationsDAO();
    }

    getAllLocalizations = async () => {
        return this.dao.getAllLocalizations();
    }
}

module.exports = LocalizationSerivce;
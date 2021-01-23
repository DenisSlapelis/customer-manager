const environment = require('../../environment/environment');
const axios = require('axios');

class LocalizationSerivce {
    constructor() {
        this.api = environment.apiUrl;
    }

    getUFList = async () => {
        const response = await axios.get(`${this.api}/localizations/`);
        const data = response.data;
        const result = [];

        data.forEach(item => {
            if (!result.includes(item.UF))
                result.push(item.UF);
        });

        return { statusCode: response.status, result };
    }

    getCityListByUF = async (UF) => {
        const response = await axios.get(`${this.api}/localizations/${UF}`);
        const result = response.data.map(item => (item.city));

        return { statusCode: response.status, result };
    }
}

module.exports = LocalizationSerivce;
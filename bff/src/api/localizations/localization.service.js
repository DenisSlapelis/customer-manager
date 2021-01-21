const environment = require('../../environment/environment');
const axios = require('axios');

class LocalizationSerivce {
    constructor() {
        this.api = environment.apiUrl;
    }

    getAllLocalizations = async () => {
        const response = await axios.get(`${this.api}/localizations/`);
        const data = response.data;

        const allUF = [];
        const allCities = [];

        data.forEach(item => {
            if (!allUF.includes(item.UF))
                allUF.push(item.UF);

            allCities.push({
                UF: item.UF,
                city: item.city
            })
        });

        const result = {
            UF: allUF,
            cities: allCities
        };

        return { statusCode: response.status, result };
    }
}

module.exports = LocalizationSerivce;
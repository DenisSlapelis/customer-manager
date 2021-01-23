const CustomError = require('../../shared/custom-error');
const localizations = require('../../db/schemas/localizations.schema');

class LocalizationDAO {
    getUFList = async () => {
        const data = await localizations.find().sort({ UF: 1 }).catch(err => {
            console.log('error: ', err)
            throw new CustomError(err.message, 'MongoDB Error');
        });

        return data;
    }

    getCityListByUF = async (UF) => {
        const data = await localizations.find({ UF: UF }).sort({ city: 1 }).catch(err => {
            console.log('error: ', err)
            throw new CustomError(err.message, 'MongoDB Error');
        });

        return data;
    }
}

module.exports = LocalizationDAO;
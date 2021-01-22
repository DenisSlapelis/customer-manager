const CustomError = require('../../shared/custom-error');
const localizations = require('../../db/schemas/localizations.schema');

class LocalizationDAO {
    getAllLocalizations = async () => {
        const data = await localizations.find().sort({ UF: 1 }).catch(err => {
            console.log('error: ', err)
            throw new CustomError(err.message, 'MongoDB Error');
        });

        return data;
    }
}

module.exports = LocalizationDAO;
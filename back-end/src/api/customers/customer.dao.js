const CustomError = require('../../shared/custom-error');
const customers = require('../../db/schemas/customers.schema');
const localizations = require('../../db/schemas/localizations.schema');

class CustomerDAO {
    getCustomerByDocumentUfCity = async (document, uf, city) => {
        const data = await customers.findOne({ document: Number.parseInt(document), uf: uf, city: city }).catch(err => {
            console.log('error: ', err)
            throw new CustomError(err.message, 'MongoDB Error');
        });

        return data;
    }

    getCustomerByDocument = async (document) => {
        const data = await customers.findOne({ document: Number.parseInt(document) }).catch(err => {
            console.log('error: ', err)
            throw new CustomError(err.message, 'MongoDB Error');
        });

        return data;
    }

    insertNewCustomer = async ({ type, name, document, phone, uf, city, birthDate }) => {
        const doc = [
            {
                type, name, document, phone, uf, city, birthDate
            }
        ];

        await customers.insertMany(doc).catch(err => {
            console.log('error: ', err)
            throw new CustomError(err.message, 'MongoDB Error');
        });
    }

    // getValidsUf = async () => {
    //     const result = [];
    //     const data = await localizations.find();

    //     data.forEach(item => {
    //         if (!result.includes(item.UF))
    //             result.push(item.UF);
    //     });

    //     return result;
    // }
}

module.exports = CustomerDAO;
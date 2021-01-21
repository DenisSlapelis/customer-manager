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

    getPaginatedCustomersList = async (page, itemsPerPage) => {
        const limit = Number.parseInt(itemsPerPage);
        const count = itemsPerPage * (page - 1);
        const data = await customers.find().skip(count).limit(limit).catch(err => {
            console.log('error: ', err)
            throw new CustomError(err.message, 'MongoDB Error');
        });

        return data;
    }

    getTotalCustomers = async () => {
        const data = await customers.find().countDocuments().catch(err => {
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

    updateCustomerById = async ({ id, type, name, document, uf, city, phone }) => {
        const filter = { _id: id };
        const options = { upsert: false };
        const updateDoc = {
            $set: {
                type: type,
                name: name,
                document: document,
                uf: uf,
                city: city,
                phone: phone
            },
        };

        await customers.updateOne(filter, updateDoc, options).catch(err => {
            console.log('error: ', err)
            throw new CustomError(err.message, 'MongoDB Error');
        });
    }

    removeCustomerById = async (id) => {
        const query = { _id: id };

        await customers.deleteOne(query).catch(err => {
            console.log('error: ', err)
            throw new CustomError(err.message, 'MongoDB Error');
        });
    }
}

module.exports = CustomerDAO;
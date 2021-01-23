const CustomError = require('../../shared/custom-error');
const customers = require('../../db/schemas/customers.schema');

class CustomerDAO {
    getCustomerByDocumentUFCity = async (document, UF, city) => {
        const data = await customers.findOne({ document: Number.parseInt(document), UF: UF, city: city }).catch(err => {
            console.log('error: ', err)
            throw new CustomError(err.message, 'MongoDB Error');
        });

        return data;
    }

    getCustomerById = async (id) => {
        const data = await customers.findOne({ _id: id }).catch(err => {
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

    insertNewCustomer = async ({ personType, name, document, phone, UF, city, birthDate }) => {
        const doc = [
            {
                personType, name, document, phone, UF, city, birthDate
            }
        ];

        await customers.insertMany(doc).catch(err => {
            console.log('error: ', err)
            throw new CustomError(err.message, 'MongoDB Error');
        });
    }

    updateCustomerById = async ({ id, personType, name, document, UF, city, phone }) => {
        const filter = { _id: id };
        const options = { upsert: false };
        const updateDoc = {
            $set: {
                personType: personType,
                name: name,
                document: document,
                UF: UF,
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
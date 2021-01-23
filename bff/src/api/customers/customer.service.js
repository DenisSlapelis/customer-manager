const environment = require('../../environment/environment');
const axios = require('axios');

class CustomerService {
    constructor() {
        this.api = environment.apiUrl;
    }

    getCustomer = async ({ document, UF, city, personType }) => {
        const path = `${personType}/${document}/${UF}/${city}`;
        const response = await axios.get(`${this.api}/customers/${path}`);

        const result = response.data ? {
            name: response.data.name,
            document: response.data.document,
            UF: response.data.UF,
            city: response.data.city,
            phone: response.data.phone,
        } : {};

        return { statusCode: response.status, result };
    }

    getCustomerById = async (id) => {
        const response = await axios.get(`${this.api}/customers/${id}`);

        const result = response.data ? {
            personType: response.data.personType,
            name: response.data.name,
            document: response.data.document,
            UF: response.data.UF,
            city: response.data.city,
            phone: response.data.phone,
        } : {};

        return { statusCode: response.status, result };
    }

    getPaginatedCustomerList = async (page, itemsPerPage) => {
        const queryParams = {
            page, itemsPerPage
        };

        const listResponse = await axios.get(`${this.api}/customers/`, { params: queryParams });
        const totalCountData = listResponse.data.count;
        const list = [];

        listResponse.data.data.forEach(item => {
            list.push({
                id: item._id,
                personType: item.personType === 'PJ' ? 'Jurídica' : 'Física',
                name: item.name,
                document: item.document,
                phone: item.phone,
                city: item.city
            })
        });

        const totalPages = Number.parseInt((totalCountData / itemsPerPage) + ((totalCountData % itemsPerPage) !== 0 ? 1 : 0));

        const result = {
            data: list,
            totalItems: totalCountData,
            totalPages: totalPages
        };

        return { statusCode: 200, result };
    }

    insertNewCustomer = async ({ personType, name, document, phone, UF, city, birthDate }) => {
        const body = {
            personType, name, document, phone, UF, city, birthDate
        };

        const response = await axios.post(`${this.api}/customers/`, body);

        return { statusCode: response.status, result: {} };
    }

    updateCustomer = async ({ id, personType, name, document, UF, city, phone }) => {
        const body = {
            personType, name, document, UF, city, phone
        };

        const response = await axios.put(`${this.api}/customers/${id}`, body);

        return { statusCode: response.status, result: {} };
    }

    removeCustomer = async (id) => {
        const response = await axios.delete(`${this.api}/customers/${id}`);

        return { statusCode: response.status, result: {} };
    }
}

module.exports = CustomerService;
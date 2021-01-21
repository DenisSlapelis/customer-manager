const environment = require('../../environment/environment');
const axios = require('axios');

class CustomerService {
    constructor() {
        this.api = environment.apiUrl;
    }

    getCustomer = async ({ document, uf, city, type }) => {
        const path = `${type}/${document}/${uf}/${city}`;
        const response = await axios.get(`${this.api}/customers/${path}`);

        const result = {
            name: response.data.name,
            document: response.data.document,
            uf: response.data.uf,
            city: response.data.city,
            phone: response.data.phone,
        };

        return { statusCode: response.status, result };
    }

    getPaginatedCustomerList = async (page, itemsPerPage) => {
        const queryParams = {
            page, itemsPerPage
        };

        const listResponse = await axios.get(`${this.api}/customers/`, { params: queryParams });
        const countResponse = await axios.get(`${this.api}/customers/total`);

        const totalCountData = countResponse.data;
        const list = [];

        listResponse.data.forEach(item => {
            list.push({
                id: item._id,
                type: item.type === 'PJ' ? 'Jurídica' : 'Física',
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

    insertNewCustomer = async ({ type, name, document, phone, uf, city, birthDate }) => {
        const body = {
            type, name, document, phone, uf, city, birthDate
        };

        const response = await axios.post(`${this.api}/customers/`, body);

        return { statusCode: response.status, result: {} };
    }

    updateCustomer = async ({ id, type, name, document, uf, city, phone }) => {
        const body = {
            id, type, name, document, uf, city, phone
        };

        const response = await axios.put(`${this.api}/customers/`, body);

        return { statusCode: response.status, result: {} };
    }

    removeCustomer = async (id) => {
        const response = await axios.delete(`${this.api}/customers/${id}`);

        return { statusCode: response.status, result: {} };
    }
}

module.exports = CustomerService;
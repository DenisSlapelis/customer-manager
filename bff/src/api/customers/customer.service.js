const environment = require('../../environment/environment');
const axios = require('axios');
const documentValidator = require('cpf-cnpj-validator');

class CustomerService {
    constructor() {
        this.api = environment.apiUrl;
        this.cpfFormatter = documentValidator.cpf;
        this.cnpjFormatter = documentValidator.cnpj;
    }

    getCustomer = async ({ document, UF, city, personType }) => {
        const path = `${personType}/${document}/${UF}/${city}`;
        const response = await axios.get(`${this.api}/customers/${path}`);

        const result = response.data ? {
            name: response.data.name,
            document: this.formatDocument(response.data.document, personType),
            UF: response.data.UF,
            city: response.data.city,
            phone: response.data.phone,
        } : {};

        return { statusCode: response.status, result };
    }

    getCustomerById = async (id) => {
        const response = await axios.get(`${this.api}/customers/${id}`);

        const personType = response.data ? response.data.personType : "PF";

        const result = response.data ? {
            personType,
            name: response.data.name,
            document: this.formatDocument(response.data.document, personType),
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
            const personType = item.personType;

            list.push({
                id: item._id,
                personType: personType === 'PF' ? 'Física' : 'Jurídica',
                name: item.name,
                document: this.formatDocument(item.document, personType),
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

    formatDocument = (document, type) => {
        const personTypeMap = {
            'PF': this.cpfFormatter,
            'PJ': this.cnpjFormatter
        };
        const documentLength = {
            'PF': 11,
            'PJ': 14
        };

        const documentString = document.toString().padStart(documentLength[type], '0');

        return personTypeMap[type].format(documentString);
    }
}

module.exports = CustomerService;
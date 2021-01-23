
import axios from 'axios';

export const addNewCustomer = async ({ personType, name, document, UF, city, birthDate, phone }) => {
    const body = {
        personType, name, document, UF, city, birthDate, phone
    };
    return axios.post(`http://localhost:3002/api/v1/customers`, body);
}

export const getCustomersList = async (page, itemsPerPage) => {
    const params = {
        page,
        itemsPerPage,
    };

    return axios.get(`http://localhost:3002/api/v1/customers`, { params });
}

export const getCustomersById = async (id) => {
    return axios.get(`http://localhost:3002/api/v1/customers/${id}`);
}

export const getCustomersByDocumentUFCity = async (document, UF, city, personType) => {
    const params = {
        personType
    };
    return axios.get(`http://localhost:3002/api/v1/customers/${document}/${UF}/${city}`, { params });
}

export const updateCustomer = async ({ id, personType, name, document, UF, city, birthDate, phone }) => {
    const body = {
        personType, name, document, UF, city, birthDate, phone
    };
    return axios.put(`http://localhost:3002/api/v1/customers/${id}`, body);
}

export const removeCustomer = async (id) => {
    return axios.delete(`http://localhost:3002/api/v1/customers/${id}`);
}

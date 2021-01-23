
import axios from 'axios';

export const addNewCustomer = async ({ captcha, personType, name, document, UF, city, birthDate, phone }) => {
    const headers = { captcha };
    const formattedDocument = document.replace(/\D/g, '');
    const formattedPhone = document.replace(/\D/g, '');

    const body = {
        personType, name, document: formattedDocument, UF, city, birthDate, phone: formattedPhone
    };
    return axios.post(`http://localhost:3002/api/v1/customers`, body, { headers });
}

export const getCustomersList = async (captcha, page, itemsPerPage) => {
    const headers = { captcha };
    const params = {
        page,
        itemsPerPage,
    };

    return axios.get(`http://localhost:3002/api/v1/customers`, { headers, params });
}

export const getCustomersById = async (captcha, id) => {
    const headers = { captcha };
    return axios.get(`http://localhost:3002/api/v1/customers/${id}`, { headers });
}

export const getCustomersByDocumentUFCity = async (document, UF, city, personType, captcha) => {
    const formattedDocument = document.replace(/\D/g, '');
    const headers = { captcha };
    const params = {
        personType
    };
    return axios.get(`http://localhost:3002/api/v1/customers/${formattedDocument}/${UF}/${city}`, { headers, params });
}

export const updateCustomer = async ({ captcha, id, personType, name, document, UF, city, birthDate, phone }) => {
    const formattedDocument = document.replace(/\D/g, '');
    const formattedPhone = document.replace(/\D/g, '');
    const headers = { captcha };
    const body = {
        personType, name, document: formattedDocument, UF, city, birthDate, phone: formattedPhone
    };
    return axios.put(`http://localhost:3002/api/v1/customers/${id}`, body, { headers });
}

export const removeCustomer = async (captcha, id) => {
    const headers = { captcha };
    return axios.delete(`http://localhost:3002/api/v1/customers/${id}`, { headers });
}

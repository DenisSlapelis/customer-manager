const CustomerDAO = require('./customer.dao');
const CustomerUtils = require('./customer.utils');

class CustomerService {
    constructor() {
        this.dao = new CustomerDAO();
        this.utils = new CustomerUtils();
    }

    insertNewCustomer = async ({ type, name, document, phone, uf, city, birthDate }) => {
        await this.utils.newCustomerValidation({ type, name, document, phone, uf, city, birthDate });
        const formattedDocument = this.utils.formatDocument(document);
        await this.dao.insertNewCustomer({ type, name, document: formattedDocument, phone, uf, city, birthDate });
    }

    getCustomerByCpf = async (cpf, uf, city) => {
        this.utils.validatePfArgs(cpf, uf, city);
        return this.dao.getCustomerByDocumentUfCity(cpf, uf, city);
    }

    getCustomerByCnpjUfCity = async (cnpj, uf, city) => {
        this.utils.validatePjArgs(cnpj, uf, city);
        return this.dao.getCustomerByDocumentUfCity(cnpj, uf, city);
    }

    updateCustomer = async ({ id, type, name, document, uf, city, phone }) => {
        await this.utils.updateCustomerValidation({ id, type, name, document, uf, city, phone });
        const formattedDocument = this.utils.formatDocument(document);
        await this.dao.updateCustomerById({ id, type, name, document: formattedDocument, uf, city, phone });
    }

    removeCustomer = async (id) => {
        await this.dao.removeCustomerById(id);
    }

    getPaginatedCustomerList = async (page, itemsPerPage) => {
        return this.dao.getPaginatedCustomersList(page, itemsPerPage);
    }

    getTotalCustomers = async () => {
        return this.dao.getTotalCustomers();
    }
}

module.exports = CustomerService;
const CustomerDAO = require('./customer.dao');
const CustomerUtils = require('./customer.utils');

class CustomerService {
    constructor() {
        this.dao = new CustomerDAO();
        this.utils = new CustomerUtils();
    }

    insertNewCustomer = async ({ type, name, document, phone, uf, city, birthDate }) => {
        await this.utils.customerValidation({ type, name, document, phone, uf, city, birthDate });
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
}

module.exports = CustomerService;
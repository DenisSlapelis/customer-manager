const CustomerDAO = require('./customer.dao');
const CustomerUtils = require('./customer.utils');

class CustomerService {
    constructor() {
        this.dao = new CustomerDAO();
        this.utils = new CustomerUtils();
    }

    insertNewCustomer = async ({ personType, name, document, phone, UF, city, birthDate }) => {
        await this.utils.newCustomerValidation({ personType, name, document, phone, UF, city, birthDate });
        const formattedDocument = this.utils.formatDocument(document);
        await this.dao.insertNewCustomer({ personType, name, document: formattedDocument, phone, UF, city, birthDate });
    }

    getCustomerByCpf = async (cpf, UF, city) => {
        this.utils.validatePfArgs(cpf, UF, city);
        return this.dao.getCustomerByDocumentUFCity(cpf, UF, city);
    }

    getCustomerById = async (id) => {
        return this.dao.getCustomerById(id);
    }

    getCustomerByCnpjUfCity = async (cnpj, UF, city) => {
        this.utils.validatePjArgs(cnpj, UF, city);
        return this.dao.getCustomerByDocumentUFCity(cnpj, UF, city);
    }

    updateCustomer = async ({ id, personType, name, document, UF, city, phone }) => {
        await this.utils.updateCustomerValidation({ id, personType, name, document, UF, city, phone });
        const formattedDocument = this.utils.formatDocument(document);
        await this.dao.updateCustomerById({ id, personType, name, document: formattedDocument, UF, city, phone });
    }

    removeCustomer = async (id) => {
        await this.dao.removeCustomerById(id);
    }

    getPaginatedCustomerList = async (page, itemsPerPage) => {
        const data = await this.dao.getPaginatedCustomersList(page, itemsPerPage);
        const count = await this.dao.getTotalCustomers();
        return { data, count };
    }
}

module.exports = CustomerService;
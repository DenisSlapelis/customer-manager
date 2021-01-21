const CustomError = require('../../shared/custom-error', 'Validation Error');
const CustomerDAO = require('./customer.dao');
const documentValidator = require('cpf-cnpj-validator');
const phoneValidator = require('validar-telefone');
const dayjs = require('dayjs')();

class CustomerUtils {
    constructor() {
        this.dao = new CustomerDAO();
    }

    customerValidation = async ({ type, name, document, phone, uf, city, birthDate }) => {
        this.typeValidation(type);
        this.nameValidation(name);
        this.documentValidation(type, document);
        this.phoneValidation(phone);
        this.ufValidation(uf);
        this.cityValidation(city);
        this.birthDateValidation(birthDate);
        await this.checksIfCustomerAlreadyExists(document);
    }

    validatePfArgs = (cnpj, uf, city) => {
        this.documentValidation('PF', cnpj);
        this.ufValidation(uf);
        this.cityValidation(city);
    }

    validatePjArgs = (cnpj, uf, city) => {
        this.documentValidation('PJ', cnpj);
        this.ufValidation(uf);
        this.cityValidation(city);
    }

    typeValidation = (type) => {
        if (!type)
            throw new CustomError('Required param type was not found', 'Validation Error');

        const validTypes = ['PF', 'PJ'];

        if (!validTypes.includes(type.toUpperCase()))
            throw new CustomError('Invalid person type', 'Validation Error');
    }

    nameValidation = (name) => {
        if (!name)
            throw new CustomError('Required param name was not found', 'Validation Error');
    }

    documentValidation = (type, document) => {
        if (!document)
            throw new CustomError('Required param document was not found', 'Validation Error');

        type == 'PJ' ? this.cnpjValidation(document) : this.cpfValidation(document);
    }

    cpfValidation = (cpf) => {
        const cpfValidator = documentValidator.cpf;

        if (!cpfValidator.isValid(cpf)) {
            throw new CustomError('Invalid document (CPF)', 'Validation Error');
        }
    }

    cnpjValidation = (cnpj) => {
        const cnpjValidator = documentValidator.cnpj;

        if (!cnpjValidator.isValid(cnpj)) {
            throw new CustomError('Invalid document (CNPJ)', 'Validation Error');
        }
    }

    phoneValidation = (phone) => {
        if (!phone)
            throw new CustomError('Required param phone was not found', 'Validation Error');

        if (!phoneValidator.default(phone))
            throw new CustomError('Invalid phone number', 'Validation Error');
    }

    ufValidation = (uf) => {
        if (!uf)
            throw new CustomError('Required param uf was not found', 'Validation Error');

        const validUf = [
            'RO', 'SE', 'BA', 'MG', 'ES',
            'RJ', 'SP', 'PR', 'SC', 'RS',
            'MS', 'MT', 'GO', 'DF', 'AC',
            'AM', 'RR', 'PA', 'AP', 'TO',
            'MA', 'PI', 'CE', 'RN', 'PB',
            'PE', 'AL'
        ]

        if (!validUf.includes(uf.toUpperCase()))
            throw new CustomError('Invalid uf', 'Validation Error');
    }

    cityValidation = (city) => {
        if (!city)
            throw new CustomError('Required param city was not found', 'Validation Error');
    }

    birthDateValidation = (birthDate) => {
        if (!birthDate)
            throw new CustomError('Required param birthDate was not found', 'Validation Error');

        if (!dayjs.isValid(birthDate))
            throw new CustomError('Invalid birthDate', 'Validation Error');
    }

    checksIfCustomerAlreadyExists = async (document) => {
        const formattedDocument = this.formatDocument(document);
        const result = await this.dao.getCustomerByDocument(formattedDocument);

        if (result.length !== 0)
            throw new CustomError("Customer already registered!", 'Validation Error');
    }

    formatDocument = (document) => {
        const result = document.replace(/[^0-9]/g, '');
        return parseInt(result);
    }
}

module.exports = CustomerUtils;
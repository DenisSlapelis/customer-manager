const CustomError = require('../../shared/custom-error', 'Validation Error');
const CustomerDAO = require('./customer.dao');
const documentValidator = require('cpf-cnpj-validator');
const phoneValidator = require('validar-telefone');
const dayjs = require('dayjs')();

class CustomerUtils {
    constructor() {
        this.dao = new CustomerDAO();
    }

    newCustomerValidation = async ({ personType, name, document, phone, UF, city, birthDate }) => {
        this.personTypeValidation(personType);
        this.nameValidation(name);
        this.documentValidation(personType, document);
        this.phoneValidation(phone);
        this.UFValidation(UF);
        this.cityValidation(city);
        this.birthDateValidation(birthDate);
        await this.checksIfCustomerAlreadyExists(document);
    }

    updateCustomerValidation = async ({ id, personType, name, document, phone, UF, city }) => {
        this.idValidation(id);
        this.personTypeValidation(personType);
        this.nameValidation(name);
        this.documentValidation(personType, document);
        this.phoneValidation(phone);
        this.UFValidation(UF);
        this.cityValidation(city);
    }

    validatePfArgs = (cnpj, UF, city) => {
        this.documentValidation('PF', cnpj);
        this.UFValidation(UF);
        this.cityValidation(city);
    }

    validatePjArgs = (cnpj, UF, city) => {
        this.documentValidation('PJ', cnpj);
        this.UFValidation(UF);
        this.cityValidation(city);
    }

    idValidation = (id) => {
        if (!id)
            throw new CustomError('Required param id was not found', 'Validation Error');
    }

    personTypeValidation = (personType) => {
        if (!personType)
            throw new CustomError('Required param personType was not found', 'Validation Error');

        const validpersonTypes = ['PF', 'PJ'];

        if (!validpersonTypes.includes(personType.toUpperCase()))
            throw new CustomError('Invalid person personType', 'Validation Error');
    }

    nameValidation = (name) => {
        if (!name)
            throw new CustomError('Required param name was not found', 'Validation Error');
    }

    documentValidation = (personType, document) => {
        if (!document)
            throw new CustomError('Required param document was not found', 'Validation Error');

        personType == 'PJ' ? this.cnpjValidation(document) : this.cpfValidation(document);
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

    UFValidation = (UF) => {
        if (!UF)
            throw new CustomError('Required param UF was not found', 'Validation Error');

        const validUF = [
            'RO', 'SE', 'BA', 'MG', 'ES',
            'RJ', 'SP', 'PR', 'SC', 'RS',
            'MS', 'MT', 'GO', 'DF', 'AC',
            'AM', 'RR', 'PA', 'AP', 'TO',
            'MA', 'PI', 'CE', 'RN', 'PB',
            'PE', 'AL'
        ]

        if (!validUF.includes(UF.toUpperCase()))
            throw new CustomError('Invalid UF', 'Validation Error');
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

        if (result && result.length !== 0)
            throw new CustomError("Customer already registered!", 'Validation Error');
    }

    formatDocument = (document) => {
        const result = document.replace(/[^0-9]/g, '');
        return parseInt(result);
    }
}

module.exports = CustomerUtils;
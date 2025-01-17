const express = require('express');
const router = express.Router();
const CustomerService = require('./customer.service');
const service = new CustomerService();

router.get('/:document/:UF/:city', async (req, res) => {
    try {
        const document = req.params.document;
        const UF = req.params.UF;
        const city = req.params.city;
        const personType = req.query.personType;
        const response = await service.getCustomer({ document, UF, city, personType });

        res.status(response.statusCode).json(response.result);
    } catch (err) {
        const error = err.hasOwnProperty('response') ? err.response : {};
        const statusCode = error.hasOwnProperty('status') ? error.status : 500;
        const errorData = {
            name: error.hasOwnProperty('data') ? error.data.name : '',
            message: error.hasOwnProperty('data') ? error.data.message : '',
        };
        res.status(statusCode).json(errorData);
    }
});

router.get('/', async (req, res) => {
    try {
        const page = req.query.page;
        const itemsPerPage = req.query.itemsPerPage;
        const response = await service.getPaginatedCustomerList(page, itemsPerPage);

        res.status(response.statusCode).json(response.result);
    } catch (err) {
        const error = err.hasOwnProperty('response') ? err.response : {};
        const statusCode = error.hasOwnProperty('status') ? error.status : 500;
        const errorData = {
            name: error.hasOwnProperty('data') ? error.data.name : '',
            message: error.hasOwnProperty('data') ? error.data.message : '',
        };
        res.status(statusCode).json(errorData);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const response = await service.getCustomerById(id);

        res.status(response.statusCode).json(response.result);
    } catch (err) {
        const error = err.hasOwnProperty('response') ? err.response : {};
        const statusCode = error.hasOwnProperty('status') ? error.status : 500;
        const errorData = {
            name: error.hasOwnProperty('data') ? error.data.name : '',
            message: error.hasOwnProperty('data') ? error.data.message : '',
        };
        res.status(statusCode).json(errorData);
    }
});

router.post('/', async (req, res) => {
    try {
        const response = await service.insertNewCustomer(req.body);

        res.status(response.statusCode).json(response.result);
    } catch (err) {
        const error = err.hasOwnProperty('response') ? err.response : {};
        const statusCode = error.hasOwnProperty('status') ? error.status : 500;
        const errorData = {
            name: error.hasOwnProperty('data') ? error.data.name : '',
            message: error.hasOwnProperty('data') ? error.data.message : '',
        };
        res.status(statusCode).json(errorData);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const response = await service.updateCustomer({ id, ...req.body });

        res.status(response.statusCode).json(response.result);
    } catch (err) {
        const error = err.hasOwnProperty('response') ? err.response : {};
        const statusCode = error.hasOwnProperty('status') ? error.status : 500;
        const errorData = {
            name: error.hasOwnProperty('data') ? error.data.name : '',
            message: error.hasOwnProperty('data') ? error.data.message : '',
        };
        res.status(statusCode).json(errorData);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const response = await service.removeCustomer(id);

        res.status(response.statusCode).json(response.result);
    } catch (err) {
        const error = err.hasOwnProperty('response') ? err.response : {};
        const statusCode = error.hasOwnProperty('status') ? error.status : 500;
        const errorData = {
            name: error.hasOwnProperty('data') ? error.data.name : '',
            message: error.hasOwnProperty('data') ? error.data.message : '',
        };
        res.status(statusCode).json(errorData);
    }
});

module.exports = router;
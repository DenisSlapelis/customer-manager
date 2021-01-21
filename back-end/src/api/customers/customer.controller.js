const formatter = require('../../shared/format-error');
const express = require('express');
const router = express.Router();
const CustomerService = require('./customer.service');
const service = new CustomerService();

router.get('/PF/:cpf/:uf/:city', async (req, res) => {
    /*
        == Description
        #swagger.tags = ['Customers']
        #swagger.description = 'Get PF customer data from MongoDB database.'
        #swagger.path = '/api/v1/customers/{cpf}/{uf}/{city}'
 
        == Params:
        #swagger.parameters['cpf'] = {
            in: 'path',
            description: 'Customer document (CPF).',
            required: true,
            type: 'string'
        }

        #swagger.parameters['uf'] = {
            in: 'path',
            description: 'Customer UF.',
            required: true,
            type: 'string'
        }

        #swagger.parameters['city'] = {
            in: 'path',
            description: 'Customer city.',
            required: true,
            type: 'string'
        }
 
        == Successful response:
        #swagger.responses[200] = {
            schema: { $ref: "#/definitions/Customers" },
            description: 'JSON data'
        }
 
        == Error responses:
        #swagger.responses[400] = {
            schema: { $ref: "#/definitions/CustomError" },
            description: 'Validation Error'
        }
 
        #swagger.responses[500] = {
            schema: { $ref: "#/definitions/CustomError" },
            description: 'Unexpected error'
        }
    */

    try {
        const cpf = req.params.cpf;
        const uf = req.params.uf;
        const city = req.params.city;
        const result = await service.getCustomerByCpf(cpf, uf, city);

        res.status(200).json(result);
    } catch (err) {
        if (err.name && err.name === 'Validation Error')
            res.status(400).json(err);
        else
            res.status(500).json(formatter.formatErrorResponse(err));
    }
});

router.get('/PJ/:cnpj/:uf/:city', async (req, res) => {
    /*
        == Description
        #swagger.tags = ['Customers']
        #swagger.description = 'Get PJ customer data from MongoDB database.'
        #swagger.path = '/api/v1/customers/{cnpj}/{uf}/{city}'
 
        == Params:
        #swagger.parameters['cnpj'] = {
            in: 'path',
            description: 'Customer document (CNPJ).',
            required: true,
            type: 'string'
        }

        #swagger.parameters['uf'] = {
            in: 'path',
            description: 'Customer UF.',
            required: true,
            type: 'string'
        }

        #swagger.parameters['city'] = {
            in: 'path',
            description: 'Customer city.',
            required: true,
            type: 'string'
        }
 
        == Successful response:
        #swagger.responses[200] = {
            schema: { $ref: "#/definitions/Customers" },
            description: 'JSON data'
        }
 
        == Error responses:
        #swagger.responses[400] = {
            schema: { $ref: "#/definitions/CustomError" },
            description: 'Validation Error'
        }
 
        #swagger.responses[500] = {
            schema: { $ref: "#/definitions/CustomError" },
            description: 'Unexpected error'
        }
    */

    try {
        const cnpj = req.params.cnpj;
        const uf = req.path.uf;
        const city = req.path.city;
        const result = await service.getCustomerByCnpjUfCity(cnpj, uf, city);

        res.status(200).json(result);
    } catch (err) {
        if (err.name && err.name === 'Validation Error')
            res.status(400).json(err);
        else
            res.status(500).json(formatter.formatErrorResponse(err));
    }
});

router.post('/', async (req, res) => {
    /*
        == Description
        #swagger.tags = ['Customers']
        #swagger.description = 'Creates a new Customer if one does not already exist.'
        #swagger.path = '/api/v1/customers/'

        == Params:
        #swagger.parameters['type'] = {
            in: 'body',
            description: 'Person type (PF/PJ).',
            required: true,
            type: 'string'
        }

        #swagger.parameters['name'] = {
            in: 'body',
            description: 'Customer name.',
            required: true,
            type: 'string'
        }

        #swagger.parameters['document'] = {
            in: 'body',
            description: 'Customer document (CPF/CNPJ).',
            required: true,
            type: 'string'
        }

        #swagger.parameters['phone'] = {
            in: 'body',
            description: 'Customer phone number.',
            required: true,
            type: 'string'
        }

        #swagger.parameters['uf'] = {
            in: 'body',
            description: 'Customer UF.',
            required: true,
            type: 'string'
        }

        #swagger.parameters['city'] = {
            in: 'body',
            description: 'Customer city.',
            required: true,
            type: 'string'
        }

        #swagger.parameters['birthDate'] = {
            in: 'body',
            description: 'Customer birthDate.',
            required: true,
            type: 'string'
        }

        == Successful response:
        #swagger.responses[201] = {
            schema: { },
            description: 'Cusotmer was successfully created.'
        }

        == Error responses:
        #swagger.responses[400] = {
            schema: { $ref: "#/definitions/CustomError" },
            description: 'Validation Error'
        }

        #swagger.responses[500] = {
            schema: { $ref: "#/definitions/CustomError" },
            description: 'Unexpected error'
        }
    */

    try {
        await service.insertNewCustomer(req.body);
        res.status(201).send();
    } catch (err) {
        if (err.name && err.name === 'Validation Error')
            res.status(400).json(err);
        else
            res.status(500).json(formatter.formatErrorResponse(err));
    }
});

router.put('/', async (req, res) => {
    /*
        == Description
        #swagger.tags = ['Customers']
        #swagger.description = 'Updates a Customer.'
        #swagger.path = '/api/v1/customers/'

        == Params:
        #swagger.parameters['id'] = {
            in: 'body',
            description: 'Customer id.',
            required: true,
            type: 'string'
        }

        #swagger.parameters['type'] = {
            in: 'body',
            description: 'Person type (PF/PJ).',
            required: true,
            type: 'string'
        }

        #swagger.parameters['name'] = {
            in: 'body',
            description: 'Customer name.',
            required: true,
            type: 'string'
        }

        #swagger.parameters['document'] = {
            in: 'body',
            description: 'Customer document (CPF/CNPJ).',
            required: true,
            type: 'string'
        }

        #swagger.parameters['uf'] = {
            in: 'body',
            description: 'Customer UF.',
            required: true,
            type: 'string'
        }

        #swagger.parameters['city'] = {
            in: 'body',
            description: 'Customer city.',
            required: true,
            type: 'string'
        }

        #swagger.parameters['phone'] = {
            in: 'body',
            description: 'Customer phone number.',
            required: true,
            type: 'string'
        }

        == Successful response:
        #swagger.responses[200] = {
            schema: { },
            description: 'Cusotmer was successfully updated.'
        }

        == Error responses:
        #swagger.responses[400] = {
            schema: { $ref: "#/definitions/CustomError" },
            description: 'Validation Error'
        }

        #swagger.responses[500] = {
            schema: { $ref: "#/definitions/CustomError" },
            description: 'Unexpected error'
        }
    */

    try {
        await service.updateCustomer(req.body);
        res.status(200).send();
    } catch (err) {
        if (err.name && err.name === 'Validation Error')
            res.status(400).json(err);
        else
            res.status(500).json(formatter.formatErrorResponse(err));
    }
});

router.delete('/:id', async (req, res) => {
    /*
        == Description
        #swagger.tags = ['Customers']
        #swagger.description = 'Removes a Customer.'
        #swagger.path = '/api/v1/customers/'

        == Params:
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Customer id.',
            required: true,
            type: 'string'
        }

        == Successful response:
        #swagger.responses[200] = {
            schema: { },
            description: 'Cusotmer was successfully removed.'
        }

        == Error responses:
        #swagger.responses[500] = {
            schema: { $ref: "#/definitions/CustomError" },
            description: 'Unexpected error'
        }
    */

    try {
        const id = req.params.id;
        await service.removeCustomer(id);
        res.status(200).send();
    } catch (err) {
        res.status(500).json(formatter.formatErrorResponse(err));
    }
});

router.get('/', async (req, res) => {
    /*
        == Description
        #swagger.tags = ['Customers']
        #swagger.description = 'Returns a paginated Customer list.'
        #swagger.path = '/api/v1/customers/'

        == Params:
        #swagger.parameters['page'] = {
            in: 'query',
            description: 'Page.',
            required: true,
            type: 'string'
        }

        #swagger.parameters['itemsPerPage'] = {
            in: 'query',
            description: 'items per page.',
            required: true,
            type: 'string'
        }

        == Successful response:
        #swagger.responses[200] = {
            schema: { $ref: "#/definitions/CustomersList" },
            description: 'JSON Data.'
        }

        == Error responses:
        #swagger.responses[500] = {
            schema: { $ref: "#/definitions/CustomError" },
            description: 'Unexpected error'
        }
    */

    try {
        const page = req.query.page;
        const itemsPerPage = req.query.itemsPerPage;
        const result = await service.getPaginatedCustomerList(page, itemsPerPage);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(formatter.formatErrorResponse(err));
    }
});

router.get('/total', async (req, res) => {
    /*
        == Description
        #swagger.tags = ['Customers']
        #swagger.description = 'Returns total number of Customers.'
        #swagger.path = '/api/v1/customers/total'

        == Successful response:
        #swagger.responses[200] = {
            schema: { $ref: "#/definitions/TotalCustomers" },
            description: 'JSON Data.'
        }

        == Error responses:
        #swagger.responses[500] = {
            schema: { $ref: "#/definitions/CustomError" },
            description: 'Unexpected error'
        }
    */

    try {
        const result = await service.getTotalCustomers();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(formatter.formatErrorResponse(err));
    }
});

module.exports = router;
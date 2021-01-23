const formatter = require('../../shared/format-error');
const express = require('express');
const router = express.Router();
const CustomerService = require('./customer.service');
const service = new CustomerService();

router.get('/PF/:cpf/:UF/:city', async (req, res) => {
    /*
        == Description
        #swagger.tags = ['Customers']
        #swagger.description = 'Get PF customer data from MongoDB database.'
        #swagger.path = '/api/v1/customers/{cpf}/{UF}/{city}'
 
        == Params:
        #swagger.parameters['cpf'] = {
            in: 'path',
            description: 'Customer document (CPF).',
            required: true,
            type: 'string'
        }

        #swagger.parameters['UF'] = {
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
        const UF = req.params.UF;
        const city = req.params.city;
        const result = await service.getCustomerByCpf(cpf, UF, city);

        res.status(200).json(result);
    } catch (err) {
        if (err.name && err.name === 'Validation Error')
            res.status(400).json(err);
        else
            res.status(500).json(formatter.formatErrorResponse(err));
    }
});

router.get('/PJ/:cnpj/:UF/:city', async (req, res) => {
    /*
        == Description
        #swagger.tags = ['Customers']
        #swagger.description = 'Get PJ customer data from MongoDB database.'
        #swagger.path = '/api/v1/customers/{cnpj}/{UF}/{city}'
 
        == Params:
        #swagger.parameters['cnpj'] = {
            in: 'path',
            description: 'Customer document (CNPJ).',
            required: true,
            type: 'string'
        }

        #swagger.parameters['UF'] = {
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
        const UF = req.path.UF;
        const city = req.path.city;
        const result = await service.getCustomerByCnpjUfCity(cnpj, UF, city);

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
        #swagger.parameters['personType'] = {
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

        #swagger.parameters['UF'] = {
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

router.put('/:id', async (req, res) => {
    /*
        == Description
        #swagger.tags = ['Customers']
        #swagger.description = 'Updates a Customer.'
        #swagger.path = '/api/v1/customers/{id}'

        == Params:
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Customer id.',
            required: true,
            type: 'string'
        }

        #swagger.parameters['personType'] = {
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
        const id = req.params.id;
        await service.updateCustomer({ id, ...req.body });
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
        #swagger.path = '/api/v1/customers/{id}'

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

router.get('/:id', async (req, res) => {
    /*
        == Description
        #swagger.tags = ['Customers']
        #swagger.description = 'Returns a Customer by id.'
        #swagger.path = '/api/v1/customers/{id}'

        == Params:
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Customer id.',
            required: true,
            type: 'string'
        }

        == Successful response:
        #swagger.responses[200] = {
            schema: { $ref: "#/definitions/Customers" },
            description: 'JSON Data.'
        }

        == Error responses:
        #swagger.responses[500] = {
            schema: { $ref: "#/definitions/CustomError" },
            description: 'Unexpected error'
        }
    */

    try {
        const id = req.params.id;
        const result = await service.getCustomerById(id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(formatter.formatErrorResponse(err));
    }
});

module.exports = router;
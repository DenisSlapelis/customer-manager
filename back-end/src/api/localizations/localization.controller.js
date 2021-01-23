const formatter = require('../../shared/format-error');
const express = require('express');
const router = express.Router();
const LocalizationSerivce = require('./localization.service');
const service = new LocalizationSerivce();

router.get('/', async (req, res) => {
    /*
        == Description
        #swagger.tags = ['Localizations']
        #swagger.description = 'Get all localizations from MongoDB database.'
        #swagger.path = '/api/v1/localizations/'

        == Successful response:
        #swagger.responses[200] = {
            schema: { $ref: "#/definitions/Localizations" },
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
        const result = await service.getUFList();
        res.status(200).json(result);
    } catch (err) {
        if (err.name && err.name === 'Validation Error')
            res.status(400).json(err);
        else
            res.status(500).json(formatter.formatErrorResponse(err));
    }
});

router.get('/:UF', async (req, res) => {
    /*
        == Description
        #swagger.tags = ['Localizations']
        #swagger.description = 'Get all cities from UF.'
        #swagger.path = '/api/v1/localizations/{UF}'

        == Successful response:
        #swagger.responses[200] = {
            schema: { $ref: "#/definitions/Cities" },
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
        const UF = req.params.UF;
        const result = await service.getCityListByUF(UF);
        res.status(200).json(result);
    } catch (err) {
        if (err.name && err.name === 'Validation Error')
            res.status(400).json(err);
        else
            res.status(500).json(formatter.formatErrorResponse(err));
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const LocalizationSerivce = require('./localization.service');
const service = new LocalizationSerivce();

router.get('/', async (req, res) => {
    try {
        const response = await service.getAllLocalizations();

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
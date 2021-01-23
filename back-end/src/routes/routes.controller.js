const express = require('express');
const customers = require('../api/customers/customer.controller');
const localizations = require('../api/localizations/localization.controller');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger/swagger_output.json');
const router = express.Router();

//default root rules
router.post("/", (req, res) => {
    res.status(405).send("You can't request root. Choose another path.");
});

router.get("/", (req, res) => {
    res.status(405).send("You can't request root. Choose another path.");
});

// API Documentation
router.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// API Routes
router.use('/customers', customers);
router.use('/localizations', localizations);

module.exports = router;
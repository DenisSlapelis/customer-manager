const express = require('express');
const customers = require('../api/customers/customer.controller');
const localizations = require('../api/localizations/localization.controller');
const router = express.Router();

//default root rules
router.post("/", (req, res) => {
    res.status(405).send("You can't request root. Choose another path.");
});

router.get("/", (req, res) => {
    res.status(405).send("You can't request root. Choose another path.");
});

router.use('/customers', customers);
router.use('/localizations', localizations);

module.exports = router;
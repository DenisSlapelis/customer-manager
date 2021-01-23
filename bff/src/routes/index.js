const express = require('express');
const routes = require('./routes.controller');
const router = express.Router();

//default root rules
router.post("/", (req, res) => {
    res.status(405).send("You can't request root. Choose another path.");
});

router.get("/", (req, res) => {
    res.status(405).send("You can't request root. Choose another path.");
});

router.use('/api/v1', routes);

module.exports = router;
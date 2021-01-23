const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const environment = require('./environment/environment');
const middleware = require('./routes/middleware');

const app = express();
// CORS
app.use(cors());

// JSON
app.use(express.json());

// Captcha Middleware
app.use(middleware.checkCaptcha);

// Api routes.
app.use(routes);

// Activate express listen mode.
app.listen(environment.port);
console.log('== START SERVER ON PORT ', environment.port);
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./routes');

const app = express();

// Dev environment variables.
dotenv.config();

// CORS
app.use(cors());

// JSON
app.use(express.json());

// Api routes.
app.use(routes);

// Activate express listen mode.
const port = process.env.PORT || 3004;
app.listen(port);
console.log('== START SERVER ON PORT ', port);
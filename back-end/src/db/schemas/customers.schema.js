const mongoose = require('../db');

const CustomersSchema = new mongoose.Schema({
    type: { type: String, required: true },
    name: { type: String, required: true },
    document: { type: Number, required: true },
    phone: { type: String, required: true },
    uf: { type: String, required: true },
    city: { type: String, required: true },
    birthDate: { type: Date, required: true },
});

const Customers = mongoose.model('Customers', CustomersSchema);
module.exports = Customers;
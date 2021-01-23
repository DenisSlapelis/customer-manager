const mongoose = require('../db');

const CustomersSchema = new mongoose.Schema({
    personType: { type: String, required: true },
    name: { type: String, required: true },
    document: { type: Number, required: true },
    phone: { type: String, required: true },
    UF: { type: String, required: true },
    city: { type: String, required: true },
    birthDate: { type: Date, required: true },
});

const Customers = mongoose.model('Customers', CustomersSchema);
module.exports = Customers;
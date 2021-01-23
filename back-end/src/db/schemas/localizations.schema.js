const mongoose = require('../db');

const LocalizationsSchema = new mongoose.Schema({
    UF: { type: String, required: true },
    city: { type: String, required: true },
});

const Localizations = mongoose.model('Localizations', LocalizationsSchema);
module.exports = Localizations;
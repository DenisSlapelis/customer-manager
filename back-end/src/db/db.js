const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const username = process.env.DB_USER;
const password = process.env.DB_PASS;
const dbName = process.env.DB_NAME;

const uri = `mongodb+srv://${username}:${password}@cluster0.tekok.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};

mongoose.connect(uri, options);
mongoose.Promise = global.Promise;

module.exports = mongoose;
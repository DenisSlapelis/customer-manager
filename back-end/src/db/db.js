const mongoose = require('mongoose');
const environment = require('../environment/environment');

const username = environment.dbUser;
const password = environment.dbPass;
const dbName = environment.dbName;

const uri = `mongodb+srv://${username}:${password}@cluster0.tekok.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};

mongoose.connect(uri, options);
mongoose.Promise = global.Promise;

module.exports = mongoose;
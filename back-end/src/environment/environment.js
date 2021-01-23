const dotenv = require('dotenv');
dotenv.config();

class Environment {
    constructor() {
        this.port = process.env.PORT || 3004;
        this.dbUser = process.env.DB_USER;
        this.dbPass = process.env.DB_PASS;
        this.dbName = process.env.DB_NAME;
        this.showStack = process.env.SHOW_STACK || "false";
    }

}

module.exports = new Environment();
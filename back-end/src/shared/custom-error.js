const environment = require('../environment/environment');

class CustomError {
    name;
    message;
    stack;
    constructor(message, name = '') {
        this.name = name || 'Execution Error';
        if (Array.isArray(message))
            this.message = message;
        else if (typeof message === 'string') {
            this.message = [message];
        } else {
            this.message = JSON.parse(message);
        }
        this.message = Array.isArray(message) ? message : [message];
        this.stack = environment.showStack === "true" ? (new Error()).stack : "";
    }
}

module.exports = CustomError;
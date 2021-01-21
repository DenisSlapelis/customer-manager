const dotenv = require('dotenv');
dotenv.config();

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
        this.stack = process.env.SHOW_STACK === "true" ? (new Error()).stack : "";
    }
}

exports.formatErrorResponse = (err) => {
    return err instanceof CustomError ? err : {
        name: err.name ? err.name : 'Internal Error',
        message: err.message ? formatErrorMessage(err.message) : ['Internal Error'],
        stack: err.stack ? formatErrorStack(err.stack) : null
    }
}

const formatErrorMessage = (msg) => {
    let message;
    if (Array.isArray(msg))
        message = msg;
    else if (typeof msg === 'string') {
        message = [msg];
    } else {
        message = JSON.parse(msg);
    }
    return message;
}

const formatErrorStack = (stack) => {
    return process.env.SHOW_STACK === "true" ? stack : null;
}

module.exports = CustomError;
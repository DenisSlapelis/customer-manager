const CustomError = require('./custom-error');
const environment = require('../environment/environment');

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
    return environment.showStack === "true" ? stack : null;
}
const dotenv = require('dotenv');
dotenv.config();

class Environment {
    constructor() {
        this.apiHost = process.env.BACKEND_API_HOST || 'http://localhost:3004';
        this.apiPath = process.env.BACKEND_API_PATH || '/api/v1';
        this.apiUrl = this.apiHost + this.apiPath;
        this.port = process.env.PORT || 3002;
        this.captchaKey = process.env.CAPTCHA_SECRET_KEY;
    }

}

module.exports = new Environment();
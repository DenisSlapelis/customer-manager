const axios = require('axios');
const environment = require('../environment/environment');
const allowedRoutes = ['/api/v1/localizations'];

exports.checkCaptcha = async (req, res, next) => {
    if (checkAllowedRoutes(req.url)) {
        next();
        return;
    }

    const captcha = req.headers.captcha;
    const body = {
        secret: environment.captchaKey,
        response: captcha
    };

    axios.post('https://www.google.com/recaptcha/api/siteverify', body)
        .then(() => {
            next();
        })
        .catch(err => {
            console.log('Captcha error: ', err.response);
            res.status(400).json({
                name: "Validation Error",
                message: ["Captcha Error"],
                stack: ""
            });
        });
    next();
};

const checkAllowedRoutes = (path) => {
    let allowed = false;

    allowedRoutes.forEach(route => {
        if (path.startsWith(route)) {
            allowed = true;
        }
    });

    return allowed;
}
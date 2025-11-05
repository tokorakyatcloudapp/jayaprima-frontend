const config = require('config');

module.exports = () => {
    return (error, req, res, next) => {
        const { status, message, stack } = error;
        
        const data = { 
            layout: "",
            title: 'Login',
            api_host: config.API_HOST,
            message: 'Server Unexpected Error :(',
            stack: config.MODE == 'development' ? stack : undefined
        };
        res.status(500).render('error_500', data);
    };
};
const config = require('config');

module.exports = () => {
    return (error, req, res, next) => {
        const { status, message, stack } = error;

        const data = {
            layout: "",
            title: 'Login',
            api_host: config.API_HOST,
            message: 'Page Not Found Error :(',
            stack: config.MODE == 'development' ? stack : undefined
        };

        res.status(status || 404).render('error_404', data);
    };
};
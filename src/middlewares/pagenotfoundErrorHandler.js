const config = require('config');

module.exports = () => {
    return (req, res, next) => {
        const data = {
            layout: "",
            title: 'Page Not Found - 404',
            api_host: config.API_HOST,
            message: 'Page Not Found Error :(',
            url: req.originalUrl,
            method: req.method
        };

        res.status(404).render('error_404', data);
    };
};
const axios = require('axios');
const config = require("config");

module.exports = () => {
    return async (req, res, next) => {
        const data = {
            layout: "",
            title: 'Login',
            api_host: config.API_HOST,
        };
        
        axios.get(data.api_host + '/api/info')
            .then(function (response) {
                data.data = response.data;
                res.render('login', data);
            }).catch(function (e) {
                const { status, message, stack } = e;
                data.message = 'Server Unexpected Error :(';
                data.stack = config.MODE == 'development' ? stack : undefined
                res.status(404).render('error_404', data);
            })
    }
}
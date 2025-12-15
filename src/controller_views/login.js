const { Router } = require('express');
const axios = require('axios');
const config = require("config");

module.exports = () => {
    const router = Router();

    // Handle GET request to root path for login page
    router.get('/', async (req, res) => {
        const data = {
            layout: "",
            title: 'Login'
        };

        try {
            const response = await axios.get(config.API_HOST + '/api/info');
            data.logo = config.API_HOST + response.data.logo;
            data.name = response.data.name;
            res.render('login', data);
        } catch (e) {
            data.logo = config.VIEW_HOST +":"+ config.VIEW_PORT+"/images/logo.png";
            data.name = "Toko Rakyat";
            res.render('login', data);
        }
    });

    return router;
};
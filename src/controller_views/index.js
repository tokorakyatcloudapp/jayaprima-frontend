const { Router } = require("express");
const umum = require("./umum");
//const UmumController = require('./umum/UmumController');

module.exports = () => {
    const app = Router();

    // View Routes
    app.get('/', (req, res) => {
        const data = {
            layout:""
        }
        res.render('login', data);
    });
    app.use("/umum", umum());

    return app;
};
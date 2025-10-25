const { Router } = require("express");
const umum = require("./umum");
const login = require('./login.js');

module.exports = () => {
    const app = Router();

    app.use("/", login());
    app.use("/umum", umum());

    return app;
};
const { Router } = require('express');

module.exports = () => {
    const app = Router();

    // Additional example routes
    app.get('/dashboard', require('./dashboard')());
    app.get('/profil_usaha', require('./profil_usaha')());
    //app.get('/profil_akun', require('./profil_akun')());

    return app;
}
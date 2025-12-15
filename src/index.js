const express = require('express');

const { engine } = require('express-handlebars');
const path = require('path');
const test = require('./controller_test');
const views = require('./controller_views');
const pagenotfoundErrorHandler = require('./middlewares/pagenotfoundErrorHandler');
const unexpectedErrorHandler = require('./middlewares/unexpectedErrorHandler');
const config = require('config');

const app = express();
const PORT = process.env.PORT || config.VIEW_PORT;

// Handlebars configuration
app.engine('hbs', engine({
    extname: '.hbs',
    layoutsDir: path.join(__dirname, '../views/layouts'),
    partialsDir: path.join(__dirname, '../views/partials'),
    helpers: {
        eq: function (a, b) {
            return a === b;
        },
        formatDate: function (date) {
            return new Date(date).toLocaleString();
        },
        json: function (context) {
            return JSON.stringify(context, null, 2);
        },
        section: function (name, options) {
            if (!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        },
    }
}));

app.set('view engine', 'hbs');
app.set('views', './views');
app.set('test', path.join(__dirname, '../views'));

// Static files (if needed)
// app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static('public'))

// API Routes
app.use('/', views());
app.use('/test', test());

// 404 handler - must be placed after all routes but before error handlers
app.use(pagenotfoundErrorHandler());

// Error handling middleware - must be last
app.use(unexpectedErrorHandler()); // handle 500 error handler

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    // Ensure the host includes the protocol (e.g. http://localhost)
    // and log with a colon before the port so the URL is valid.
    console.log(`🔗 View base URL: ${config.VIEW_HOST}:${PORT}`);
    console.log(`📍 Test check: ${config.VIEW_HOST}:${PORT}/test`);
});

module.exports = app;
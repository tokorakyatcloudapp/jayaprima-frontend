const express = require('express');

const { engine } = require('express-handlebars');
const path = require('path');
const test = require('./controller_test');
const views = require('./controller_views');
const pagenotfoundErrorHandler = require('./middlewares/pagenotfoundErrorHandler');
const unexpectedErrorHandler = require('./middlewares/unexpectedErrorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

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
app.use(express.static(path.join(__dirname, '../public')));

// API Routes
app.use('/', views());
app.use('/test', test());

// Error handling middleware
app.use(unexpectedErrorHandler()); // handle 500 error handler
app.use(pagenotfoundErrorHandler()); // handle 404 error handler

// 404 handler
// app.use('/{*any}', pagenotfoundErrorHandler());

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`🔗 View base URL: http://localhost:${PORT}`);
    console.log(`📍 Test check: http://localhost:${PORT}/test`);
});

module.exports = app;
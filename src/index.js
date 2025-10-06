const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const test = require('./controller_test');
const view = require('./controller_views');

const app = express(); 
const PORT = process.env.PORT || 3000;

// Handlebars configuration
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'admin',
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
        }
    }
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../views'));
app.set('test', path.join(__dirname, '../views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files (if needed)
app.use(express.static(path.join(__dirname, '../public')));

// CORS middleware (if needed)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

// API Routes
app.use('/', view());
app.use('/test', test());

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);

    if (err.isJoi) {
        return res.status(400).json({
            error: 'Validation Error',
            message: err.details[0].message
        });
    }

    res.status(500).json({
        error: 'Internal Server Error',
        message: 'Something went wrong!'
    });
});

// 404 handler
app.use('/{*any}', (req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: `Route ${req.originalUrl} not found`
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📍 Test check: http://localhost:${PORT}/test`);
    console.log(`🔗 View base URL: http://localhost:${PORT}/view`);
});

module.exports = app;
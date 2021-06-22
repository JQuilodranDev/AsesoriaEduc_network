const express = require('express');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config( {path: path.resolve(__dirname, '../.env') });
const mongoConnect = require('./db');

// Init app
const app = express();

// Init Db
mongoConnect();

//requires
const users = require('./controllers/user');



// Middelwares
app.use(morgan('tiny'));
app.use(express.json());

//Root route
app.get('/', (req, res) => {
    res.json({
        message: 'Asesoria Educ 📘',
    });
});


//ls app.use('/api/users', users);

function notFound(req, res, next) {
    res.status(404);
    const error = new Error(`Not Found - ${req.originalUrl}`);
    next(error);
}

function errorHandler(err, req, res, next) {
    const statusCode = res.statusCode !==200 ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
        message: err.message,
    });
}

app.use(notFound);
app.use(errorHandler);

module.exports = app;
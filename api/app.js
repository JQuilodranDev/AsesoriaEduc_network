const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config( {path: path.resolve(__dirname, '../.env') });
const mongoConnect = require('./db');

// Init app
const app = express();

// Init Db
mongoConnect();

//requires
const authMiddelware = require('./middelwares/authMiddleware');
const users = require('./controllers/user');
const auth = require('./controllers/auth');





// Middelwares
app.use(morgan('tiny'));
app.use(helmet());
app.use(express.json());
app.use(authMiddelware.setUser);

//Root route
app.get('/', (req, res) => {
    res.json({
        message: 'Asesoria Educ 📘',
    });
});

app.use('/controllers/auth', auth);
app.use('/controllers/users', users);



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
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const registerMiddleware = (app) => {
    // add "allow all" cors
    if (process.env.ENV === 'production') {
        const corsOptions = {
            origin: process.env.APP_URL,
            optionsSuccessStatus: 200 //
        };
        app.use(cors(corsOptions));
    } else {
        app.use(cors());
    }

    // make sure we use json
    app.use(express.json());
    app.use(express.urlencoded({
        extended: true,
    }));

    // helmet security
    app.use(helmet.noSniff());
    app.use(helmet.hidePoweredBy());
    app.use(helmet.xssFilter());
};

module.exports = {
    registerMiddleware,
}


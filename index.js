// import env file
require('dotenv').config();

const express = require('express');

const MongoClient = require('./db/MongoClient');
const { registerMiddleware } = require('./middleware');
const { registerRoutes } = require('./routes');

// connect with database
const db = new MongoClient();
db.connect();

const app = express();
const port = process.env.NODE_PORT || 80;

// register middleware
registerMiddleware(app);

// register routes
registerRoutes(app);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

const closeServer = () => {
    db.disconnect();
    process.exit();
};

process.on('SIGINT', () => closeServer());
process.on('SIGTERM', () => closeServer());

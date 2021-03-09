const express = require('express');
const MongoClient = require('./db/MongoClient');
const cors = require('cors');
const { registerRoutes } = require('./routes');

// import env file
require('dotenv').config();

// connect with database
const db = new MongoClient();
db.connect();

const app = express();
const port = process.env.NODE_PORT;

// middleware
// add "allow all" cors
app.use(cors());
// make sure we use json
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));

// register routes
registerRoutes(app);

// default 404
app.use((req, res) => {
    res.status(404);
    res.json({ error: "Page not found" });
});

app.use(function (err, req, res) {
    res.status(500).json(err);
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

const closeServer = () => {
    db.disconnect();
    process.exit();
};

process.on('SIGINT', () => closeServer());
process.on('SIGTERM', () => closeServer());

const mongoose = require('mongoose');

class MongoClient {

    construct() {
    }

    connect() {
        mongoose.connect(process.env.MONGODB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true});
        const db = mongoose.connection;
        db.on('error', function(e) {
            console.log(e);
        });
        db.once('open', function() {
            console.log("MongoDB connection successful");
        });
        this.db = db;
    }

    disconnect() {
        this.db.close();
    }
}

module.exports = MongoClient;



const mongoose = require('mongoose');

// schema
const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});

const Client = mongoose.model('Client', clientSchema);

// model
module.exports = {
    Client, clientSchema,
}

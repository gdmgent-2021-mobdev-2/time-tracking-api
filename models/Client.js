const mongoose = require('mongoose');
const { Project } = require('./Project');

// schema
const clientSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    }
});

clientSchema.pre('remove', function() {
    const client = this;
    return Project.remove({ clientId: client._id });
});

clientSchema.virtual('name').get(function() {
    const client = this;
    return `${client.firstName} ${client.lastName}`;
});

const Client = mongoose.model('Client', clientSchema);

// model
module.exports = {
    Client, clientSchema,
}

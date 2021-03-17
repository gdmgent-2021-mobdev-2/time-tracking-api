const mongoose = require('mongoose');

// schema
const logSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    minutes: {
        type: Number,
        required: true,
    },
    projectId: {
        type: 'ObjectId',
        required: true,
    },
    userId: {
        type: 'ObjectId',
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    }
});

logSchema.virtual('project', {
    ref: 'Project',
    localField: 'projectId',
    foreignField: '_id',
    justOne: true,
});

logSchema.virtual('user', {
    ref: 'User',
    localField: 'userId',
    foreignField: '_id',
    justOne: true,
});

const Log = mongoose.model('Log', logSchema);

// model
module.exports = {
    Log, logSchema,
}

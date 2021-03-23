const mongoose = require('mongoose');
const { format } = require('date-fns');

// schema
const logSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    date: {
        type: String,
        default: function() {
            return format(new Date(), 'yyyy-MM-dd');
        }
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
    },
    toObject: {
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

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user',
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

userSchema.pre('save', function(next) {
    const user = this;

    if (!user.isModified('password')) {
        return next();
    }

    try {
        bcrypt.hash(user.password, 10, function(err, hash) {
            if (err) {
                throw err;
            }
            user.password = hash;
            return next();
        });

    } catch (err) {
        return next(err);
    }
});

userSchema.methods = {
    comparePassword: function(password) {
        const user = this;
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (isMatch) {
                    resolve(true);
                } else {
                    reject(err);
                }
            });
        });
    }
};

const User = mongoose.model('User', userSchema);

// model
module.exports = {
    User, userSchema,
}

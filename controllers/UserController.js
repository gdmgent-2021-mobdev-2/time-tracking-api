const ValidationError = require('../errors/ValidationError');
const { Roles } = require('../models/User');
const { User } = require('../models/User');

const getUserResponse = (user) => {
    return {
        user: {
            email: user.email,
            name: user.name,
            role: user.role,
            _id: user._id,
        },
        token: user.createToken(),
    }
}

/*
 * Alternative non-class example! Please choose 1, don't mix :-)
 */
const register = async (req, res, next) => {
    try {
        // do not let user set own rule, override
        const values = {
            ...req.body,
            role: Roles.user,
        };
        const user = new User(values);
        const u = await user.save();
        res.status(200).json(getUserResponse(u));
    } catch (e) {
        next(e.errors ? new ValidationError(e) : e);
    }
};

const login = async (req, res, next) => {
    const { user } = req;
    res.status(200).json(getUserResponse(user));
};

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find().lean().select(['name', 'email', 'role']).exec();
        res.status(200).json(users);
    } catch (e) {
        next(e);
    }
};


module.exports = {
    register,
    login,
    getUsers,
};

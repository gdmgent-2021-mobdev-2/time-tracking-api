const ValidationError = require('../errors/ValidationError');
const { User } = require('../models/User');

/*
 * Alternative non-class example! Please choose 1, don't mix :-)
 */
const register = async (req, res, next) => {
    try {
        const user = new User(req.body);
        const u = await user.save();
        res.status(200).json(u);
    } catch (e) {
        next(e.errors ? new ValidationError(e) : e);
    }
};

const login = async (req, res, next) => {
    const { user } = req;
    const { email, role, _id } = user;
    res.status(200).json({
        user: {
            email,
            role,
            _id,
        },
        token: user.createToken(),
    });
};


module.exports = {
    register,
    login,
};

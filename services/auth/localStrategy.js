const LocalStrategy = require('passport-local');
const { User } = require('../../models/User');

// local strategy for login with username and password
const localStrategy = new LocalStrategy(
    {
        usernameField: 'email',
    }, async (email, password, done) => {
        try {
            const user = await User.findOne({ email });
            if (user) {
                const check = await user.comparePassword(password);
                if (check) {
                    return done(null, user);
                }
            }
            return done(null, null);
        } catch (e) {
            return done(e, null);
        }
    }
);

module.exports = localStrategy;

const passport = require('passport');
const LocalStrategy = require('passport-local');
const AuthError = require('../../errors/AuthError');
const { ExtractJwt, Strategy } = require('passport-jwt');
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
)

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

const jwtStrategy = new Strategy(jwtOptions, async (payload, done) => {
    try {
        const user = await User.findById(payload._id);

        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    } catch (e) {
        return done(e, false);
    }
});

passport.use('local', localStrategy);
passport.use('jwt', jwtStrategy);

const passportWithErrorHandling = (strategy) => {
    return function (req, res, next) {
        passport.authenticate(strategy, { session: false }, function(err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return next(new AuthError());
            } else {
                req.user = user;
                return next();
            }
        })(req, res, next);
    }
}

const authLocal = passportWithErrorHandling('local');
const authJwt = passportWithErrorHandling('jwt');

module.exports = {
    authLocal,
    authJwt,
}

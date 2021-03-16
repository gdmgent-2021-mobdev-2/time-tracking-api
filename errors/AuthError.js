class AuthError extends Error {
    constructor() {
        super();
        this.message = 'Unauthorized';
        this.statusCode = 401;
    }
}

module.exports = AuthError;

class ForbiddenError extends Error {
    constructor() {
        super();
        this.message = 'Forbidden';
        this.statusCode = 403;
    }
}

module.exports = ForbiddenError;

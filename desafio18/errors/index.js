const ERROR_CODES = {
    unauthorized: 401,
    notFound: 404,
}

export class GenericError extends Error {
    constructor(message, statusCode) {
        super();
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.message = message;
        Error.captureStackTrace(this);
    }
}

export class Unauthorized extends GenericError {
    constructor(message, statusCode = ERROR_CODES.unauthorized) {
        super(statusCode, message);
        this.error = ERROR_CODES.unauthorized;
    }
}

export class NotFound extends GenericError {
    constructor(message, statusCode = ERROR_CODES.notFound) {
        super(statusCode, message);
        this.error = `${ERROR_CODES.notFound}`;
    }
}

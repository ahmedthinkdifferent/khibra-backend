const ApiResponseCode = require('../../constants/ApiResponseCode');
const BaseException = require('./BaseException');

class NotAuthorizedException extends BaseException {
    constructor(message, statusCode = ApiResponseCode.NOT_AUTHORIZED, serverCode = 401) {
        super(message, statusCode, serverCode);
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.message = message;
        this.statusCode = statusCode;
        this.serverCode = serverCode;
    }
}

module.exports = NotAuthorizedException;
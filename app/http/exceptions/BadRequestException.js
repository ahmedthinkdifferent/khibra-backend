const ApiResponseCode = require('../../constants/ApiResponseCode');
const BaseException = require('./BaseException');

class BadRequestException extends BaseException {
    constructor(message, statusCode = ApiResponseCode.BAD_REQUEST, serverCode = 400) {
        super(message, statusCode, serverCode);
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.message = message;
        this.statusCode = statusCode;
        this.serverCode = serverCode;
    }
}

module.exports = BadRequestException;
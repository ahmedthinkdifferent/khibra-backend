const ApiResponseCode = require('../../constants/ApiResponseCode');
const BaseException = require('./BaseException');

class ValidationException extends BaseException {
    constructor(message, statusCode = ApiResponseCode.VALIDATION_ERROR, serverCode = 412) {
        super(message, statusCode, serverCode);
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.message = message;
        this.statusCode = statusCode;
        this.serverCode = serverCode;
    }
}

module.exports = ValidationException;
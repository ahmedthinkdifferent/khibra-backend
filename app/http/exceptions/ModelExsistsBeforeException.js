const ApiResponseCode = require('../../constants/ApiResponseCode');
const BaseException = require('./BaseException');

class ModelExsistsBeforeException extends BaseException {
    constructor(message, statusCode = ApiResponseCode.MODEL_EXISTS_BEFORE, serverCode = 400) {
        super(message, statusCode, serverCode);
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.message = message;
        this.statusCode = statusCode;
        this.serverCode = serverCode;
    }
}

module.exports = ModelExsistsBeforeException;
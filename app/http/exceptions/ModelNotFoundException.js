const ApiResponseCode = require('../../constants/ApiResponseCode');
const BaseException = require('./BaseException');

class ModelNotFoundException extends BaseException {
    constructor(message, statusCode = ApiResponseCode.MODEL_NOT_FOUND, serverCode = 400) {
        super(message, statusCode, serverCode);
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.message = message;
        this.statusCode = statusCode;
        this.serverCode = serverCode;
    }
}

module.exports = ModelNotFoundException;
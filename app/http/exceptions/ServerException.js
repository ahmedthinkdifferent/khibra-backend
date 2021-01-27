const ApiResponseCode = require('../../constants/ApiResponseCode');
const BaseException = require('./BaseException');

class ServerException extends BaseException {
    constructor(message, statusCode = ApiResponseCode.SERVER_ERROR, serverCode = 500) {
        super(message, statusCode, serverCode);
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.message = message;
        this.statusCode = statusCode;
        this.serverCode = serverCode;
    }
}

module.exports = ServerException;
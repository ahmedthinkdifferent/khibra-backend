const ApiResponseCode = require('../../constants/ApiResponseCode');

class BaseException extends Error {

    constructor(message, statusCode = ApiResponseCode.FAIL, serverCode = 400) {
        super();
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.message = message;
        this.statusCode = statusCode;
        this.serverCode = serverCode;
    }

}

module.exports = BaseException;
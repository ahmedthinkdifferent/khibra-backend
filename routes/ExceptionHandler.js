const ApiResponse = require("../app/helpers/ApiResponse");
const BaseException = require("../app/http/exceptions/BaseException");
const Logger = require("../app/helpers/Logger");
const ApiResponseCode = require("../app/constants/ApiResponseCode");

class ExceptionHandler {
  static handleExceptions(err, req, res, next) {
    if (err instanceof BaseException) {
      return ApiResponse.sendException(req, res, err);
    } else {
      Logger.error(err);
      return res.status(500).send({
        statusCode: ApiResponseCode.SERVER_ERROR,
        data: null,
        message: "Error in server",
      });
    }
  }
}

module.exports = ExceptionHandler;

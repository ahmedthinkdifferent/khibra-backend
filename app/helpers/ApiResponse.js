const ApiResponseCode = require('../constants/ApiResponseCode');
const BaseException = require('../http/exceptions/BaseException');
const ResponseOptions = require('../helpers/model/ResponseOptions');


class ApiResponse {


    static send(req, res, dataKey, data, statusCode = ApiResponseCode.SUCCESS, serverCode = 200, message = "") {
        const response = {};
        response.statusCode = statusCode;
        if (dataKey) {
            response[dataKey] = data;
        } else {
            response.data = null;
        }
        response.message = message;
        return res.status(serverCode).json(response);
    }

    static sendError(req, res, statusCode = ApiResponseCode.FAIL, serverCode = 400, message = "", dataKey, data) {
        const response = {};
        response.statusCode = statusCode;
        if (dataKey) {
            response[dataKey] = data;
        } else {
            response.data = null;
        }
        response.message = message;
        return res.status(serverCode).json(response);
    }

    static sendException(req, res, exception) {
        const response = {};
        response.data = null;
        if (exception instanceof BaseException) {
            response.statusCode = exception.statusCode;
            response.serverCode = exception.serverCode;
        } else {
            response.statusCode = ApiResponseCode.SERVER_ERROR;
            response.serverCode = 500;
        }
        response.message = exception.message || "";
        return res.status(response.serverCode).json(response);
    }


    /**
     *
     * @param req
     * @param res
     * @param {ResponseOptions} options
     * @returns {*}
     */
    static sendFromOptions(req, res, options) {
        const statusCode = options.statusCode || ApiResponseCode.SUCCESS;
        const serverCode = options.serverCode || 200;
        const data = options.data || null;
        const dataKey = options.dataKey || "data";
        const message = options.message || "";
        return ApiResponse.send(req, res, dataKey, data, statusCode, serverCode, message);
    }


}

module.exports = ApiResponse;
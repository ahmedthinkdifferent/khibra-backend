const NotAuthorizedException = require('../exceptions/NotAuthorizedException');
const LocalizationHelper = require('../../helpers/LocalizationHelper');
const ApiResponseCode = require('../../constants/ApiResponseCode');

module.exports = function canAccessRoute(permissions) {
    return function (req, res, next) {
        if (!req.user.type in permissions) {
            // user not has permission to access this route.
            throw new NotAuthorizedException(LocalizationHelper.translate("forbidden"), ApiResponseCode.FORBIDDEN, 403);
        } else next();
    }
};

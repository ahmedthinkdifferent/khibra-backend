const NotAuthorizedException = require('../exceptions/NotAuthorizedException');
const config = require("dotenv").config();
const jwt = require("jsonwebtoken");
const LocalizationHelper = require('../../helpers/LocalizationHelper');

class UserAuthenticationMiddleware {

    static auth(req, res, next) {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            throw new NotAuthorizedException(LocalizationHelper.translate("not_authorized"));
        }

        jwt.verify(token, config.parsed.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                throw new NotAuthorizedException(LocalizationHelper.translate("not_authorized"));
            }
            if(user.isBlocked){
                throw new NotAuthorizedException(LocalizationHelper.translate("user_blocked"));
            }
            req.user = user;
            next();
        });
    }

}

module.exports = UserAuthenticationMiddleware;
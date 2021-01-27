const models = require("../../../../../database/models");
const ApiResponse = require('../../../../helpers/ApiResponse');
const DataValidator = require('../../../../helpers/DataValidator');
const forgetPassValidationSchema = require('./forgetPassValidationSchema');
const RandomTextGenerator = require('../../../../helpers/RandomTextGenerator');
const EmailIntegration = require('../../../integrations/EmailIntegration');
const LocalizationHelper = require('../../../../helpers/LocalizationHelper');
const ApiResponseCode = require('../../../../constants/ApiResponseCode');
const bcrypt = require("bcrypt");
const config = require("../../../../../config/config.json");


class ForgetPasswordController {

    static async index(req, res, next) {

    }

    static async create(req, res, next) {
        try {
            DataValidator.validate(req.body, forgetPassValidationSchema.forgetPass);
            const user = await models.User.findOrFail({
                where: {
                    email: req.body.email
                }
            });
            user.passwordCode = "888899" //RandomTextGenerator.generateNumber();
            await user.save();
            // send email.
            await EmailIntegration.sendVerificationCodeEmail(user.email, user.passCode);
            return ApiResponse.sendFromOptions(req, res, {
                message: LocalizationHelper.translate("email_sent")
            });
        } catch (e) {
            return next(e);
        }
    }

    static async verify(req, res, next) {
        try {
            DataValidator.validate(req.body, forgetPassValidationSchema.verifyCode);
            const user = await models.User.findOrFail({
                where: {
                    email: req.body.email
                }
            });
            // check if user code same as sent code.
            if (user.passwordCode !== req.body.code) {
                return ApiResponse.sendError(req, res, ApiResponseCode.BAD_REQUEST, 400, LocalizationHelper.translate("invalid_code"))
            }
            user.password = await bcrypt.hash(req.body.newPassword, config.bcryptOption);
            user.passwordCode = null;
            await user.save();
            return ApiResponse.sendFromOptions(req, res, {
                message: LocalizationHelper.translate("password_changed")
            });
        } catch (e) {
            return next(e);
        }
    }


}

module.exports = ForgetPasswordController;
const ApiResponse = require('../../../../helpers/ApiResponse');
const ApiResponseCode = require('../../../../constants/ApiResponseCode');
const DataValidator = require('../../../../helpers/DataValidator');
const phoneValidationSchema = require('./phoneVerificationSchema');
const PhoneVerificationService = require('./PhoneVerificationService');
const LocalizationHelper = require('../../../../helpers/LocalizationHelper');

class PhoneVerificationController {

    static async sendVerificationCode(req, res, next) {
        try {
            DataValidator.validate(req.body, phoneValidationSchema.sendCode);
            await PhoneVerificationService.sendCode(req.body.phone, req.body.email , req.body.type);
            return ApiResponse.sendFromOptions(req, res, {
                statusCode: ApiResponseCode.SUCCESS,
                serverCode: 200,
                message: LocalizationHelper.translate("code_sent")
            });
        } catch (e) {
            return next(e);
        }
    }

    static async verify(req, res, next) {
        try {
            DataValidator.validate(req.body, phoneValidationSchema.verify);
            const {phone, code} = req.body;
            await PhoneVerificationService.verifyCode(phone, code);
            return ApiResponse.send(req, res, null, null, ApiResponseCode.SUCCESS,
                200, LocalizationHelper.translate("phone_verified"))
        } catch (e) {
            return next(e);
        }
    }


}

module.exports = PhoneVerificationController;
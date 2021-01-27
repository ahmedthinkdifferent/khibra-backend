const PhoneVerificationController = require("../../../app/http/controllers/v1/phone_verification/PhoneVerificationController");

module.exports = (router) => {
    router.post("/phone_verification", PhoneVerificationController.sendVerificationCode);
    router.post("/phone_verification/verify", PhoneVerificationController.verify);
};
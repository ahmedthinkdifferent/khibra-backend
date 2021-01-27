const ForgetPasswordController = require("../../../app/http/controllers/v1/forget_password/ForgetPasswordController");

module.exports = (router) => {
    router.post("/users/forget_password", ForgetPasswordController.create);
    router.post("/users/forget_password/verification", ForgetPasswordController.verify);
};
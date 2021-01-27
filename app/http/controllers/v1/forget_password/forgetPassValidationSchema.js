const Joi = require('joi');
const forgetPassValidationSchema = {
    forgetPass: Joi.object({
        email: Joi.string().email().required()
    }),
    verifyCode: Joi.object({
        email: Joi.string().email({tlds: {allow: false}}).required(),
        code: Joi.string().alphanum().required().min(4),
        newPassword: Joi.string().required().min(6),
        retypedPassword: Joi.string().required().min(6).equal(Joi.ref("newPassword"))
    })
};

module.exports = forgetPassValidationSchema;
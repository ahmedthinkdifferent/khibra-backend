const Joi = require('joi');
const UserTypeConst = require('../../../../constants/UserTypeConst');
const phoneVerificationSchema = {
    sendCode: Joi.object({
        phone: Joi.string().regex(/^[0-9+]{5,}$/).required(),
        email: Joi.string().email().required(),
        type: Joi.string().valid(...UserTypeConst.getTypes()).required()
    }),
    verify: Joi.object({
        phone: Joi.string().regex(/^[0-9+]{5,}$/).required(),
        code: Joi.string().min(6).required()
    })
};

module.exports = phoneVerificationSchema;
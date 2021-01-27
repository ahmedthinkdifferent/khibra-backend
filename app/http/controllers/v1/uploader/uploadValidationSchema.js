const Joi = require('joi');
const uploadValidationSchema = {
    upload: Joi.object({
        type: Joi.string().valid("student", "university", "employer").required()
    })
};

module.exports = uploadValidationSchema;
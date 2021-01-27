const Joi = require('joi');
const courseValidationSchema = {
    createUpdate: Joi.object({
        name: Joi.string().required(),
        institution: Joi.string().required(),
        city: Joi.string().required(),
        startDate: Joi.date().iso().required(),
        endDate: Joi.date().iso().required()
    })
};

module.exports = courseValidationSchema;
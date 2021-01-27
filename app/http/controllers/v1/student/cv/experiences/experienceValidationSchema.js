const Joi = require('joi');
const experienceValidationSchema = {
    createUpdate: Joi.object({
        jobTitle: Joi.string().required().min(4),
        employer: Joi.string().required().min(2),
        city: Joi.string().required(),
        startDate: Joi.date().iso().required(),
        endDate: Joi.date().iso().required(),
        description: Joi.string().required().min(4)
    })
};

module.exports = experienceValidationSchema;
const Joi = require('joi');
const educationValidationSchema = {
    createUpdate: Joi.object({
        school: Joi.string().required().min(4),
        degree: Joi.string().required().min(2),
        city: Joi.string().required(),
        startDate: Joi.date().iso().required(),
        endDate: Joi.date().iso().required(),
        description: Joi.string()
    })
};

module.exports = educationValidationSchema;
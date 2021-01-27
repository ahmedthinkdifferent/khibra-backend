const Joi = require('joi');
const skillValidationSchema = {
    create: Joi.object({
        name: Joi.string().required().min(2)
    })
};

module.exports = skillValidationSchema;
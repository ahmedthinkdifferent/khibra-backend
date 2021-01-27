const Joi = require('joi');
const languageValidationSchema = {
    create: Joi.object({
        name: Joi.string().required().min(1)
    })
};

module.exports = languageValidationSchema;
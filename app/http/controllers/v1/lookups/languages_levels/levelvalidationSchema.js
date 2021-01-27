const Joi = require('joi');
const levelValidationSchema = {
    create: Joi.object({
        name: Joi.string().required().min(1)
    })
};

module.exports = levelValidationSchema;
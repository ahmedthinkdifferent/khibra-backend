const Joi = require('joi');
const skillLevelValidationSchema = {
    create: Joi.object({
        name: Joi.string().required().min(3)
    })
};

module.exports = skillLevelValidationSchema;
const Joi = require('joi');
const TemplateValidationSchema = {
    createUpdate: Joi.object({
        url: Joi.string().uri({}).required(),
        defaultColor: Joi.string().min(3),
        categoryId: Joi.number().integer().required()
    })
};

module.exports = TemplateValidationSchema;
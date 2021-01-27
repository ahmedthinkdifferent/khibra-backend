const Joi = require('joi');
const studentCvSchema = {
    create: Joi.object({
        templateId: Joi.number().integer().required()
    })
};

module.exports = studentCvSchema;
const Joi = require('joi');
const companyImageValidationSchema = {
    save: Joi.object({
        title: Joi.string(),
        location: Joi.string()
    }),
    image: Joi.object({
        image: Joi.any().required()
    })
};

module.exports = companyImageValidationSchema;
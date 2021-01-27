const Joi = require('joi');
const countryValidationSchema = {
    create: Joi.object({
        name: Joi.string().required().min(2)
    })
};

module.exports = countryValidationSchema;
const Joi = require('joi');


const personalInformationValidation = {
    create: Joi.object({
        firstName: Joi.string().required(),
        midName: Joi.string().required(),
        lastName: Joi.string().required(),
        birthDate: Joi.date().iso().required(),
        nationalityId: Joi.number().required(),
        countryId: Joi.number().required(),
        address: Joi.string().required(),
        city: Joi.string().required(),
        zipCode: Joi.string().regex(/^[0-9]+$/).allow(null),
        phone: Joi.string().required().regex(/^[0-9]+$/),
        email: Joi.string().email({ tlds: { allow: false } }).required()
    })
};

module.exports = personalInformationValidation;
const Joi = require('joi');
const profileValidationSchema = {
    createUpdate: Joi.object({
        name: Joi.string().min(2).required(),
        about: Joi.string().min(2),
        workField: Joi.string().min(2),
        website: Joi.string().uri(),
        facebook: Joi.string().uri(),
        twitter: Joi.string().uri(),
        instgram: Joi.string().uri()
    })
};

module.exports = profileValidationSchema;
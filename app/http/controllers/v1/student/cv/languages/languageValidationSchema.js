const Joi = require('joi');
const studentLanguageValidationSchema = {
    createUpdate: Joi.object({
        languageId: Joi.number().required().integer(),
        languageLevelId: Joi.number().required().integer()
    })
};

module.exports = studentLanguageValidationSchema;
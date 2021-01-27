const Joi = require('joi');
const cvSkillValidationSchema = {
    createUpdate: Joi.object({
        skillId: Joi.number().required(),
        skillLevelId: Joi.number().required()
    })
};

module.exports = cvSkillValidationSchema;
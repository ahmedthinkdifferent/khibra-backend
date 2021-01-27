const Joi = require('joi');
const objectiveValidation = {
    create: Joi.object({
        objective: Joi.string().required().min(10)
    })
};

module.exports = objectiveValidation;
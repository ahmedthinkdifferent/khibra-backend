const Joi = require('joi');
const categoryValidationSchema = {
  createUpdate:Joi.object({
      name:Joi.string().required().min(4)
  })
};

module.exports = categoryValidationSchema;
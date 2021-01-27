const Joi = require("joi");
const config = require("../../../../../config/config.json");
const UserTypeConst = require("../../../../constants/UserTypeConst");
const validationSchema = {
  register: Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().min(config.minPasswordLength).required(),
    password2: Joi.string()
      .min(config.minPasswordLength)
      .equal(Joi.ref("password"))
      .required(),
    type: Joi.string()
      .valid(...UserTypeConst.getTypes())
      .required(),
  }),
  login: Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().min(config.minPasswordLength).required(),
  }),
};

module.exports = validationSchema;

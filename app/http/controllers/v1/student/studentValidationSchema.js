const Joi = require('joi');
const studentValidationSchema = {
    createUpdate: Joi.object({
        firstName: Joi.string().required(),
        midName: Joi.string().required(),
        lastName: Joi.string().required(),
        universityId: Joi.number().required(),
        universityEmail: Joi.string().email({ tlds: { allow: false } }).required()
        .error((errors) => {
            errors.forEach((err) => {
                switch (err.code) {
                    case "string.empty":
                        err.message = "University email is required";
                        break;
                    default:
                        err.message = "Please enter a valid University email";
                        break;
                }
            });
            return errors;
        }),
        backupEmail: Joi.string().required().email({ tlds: { allow: false } })
        .error((errors) => {
            errors.forEach((err) => {
                switch (err.code) {
                    case "string.empty":
                        err.message = "Backup email is required";
                        break;
                    default:
                        err.message = "Please enter a valid Backup email";
                        break;
                }
            });
            return errors;
        }),
        phone: Joi.string().regex(/^[0-9+]{5,}$/)
        .error((errors) => {
            errors.forEach((err) => {
                switch (err.code) {
                    case "string.empty":
                        err.message = "Phone number is required";
                        break;
                    default:
                        err.message = "Please enter a valid phone";
                        break;
                }
            });
            return errors;
        }),
    })
};

module.exports = studentValidationSchema;
const ValidationException = require('../http/exceptions/ValidationException');

class DataValidator {

    static validate(data, schema) {
        const validationResult = schema.validate(data);
        if (validationResult.error) {
            throw new ValidationException(validationResult.error.message);
        }
    }

}

module.exports = DataValidator;
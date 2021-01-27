const models = require('../../../../../../database/models');
const ApiResponse = require('../../../../../helpers/ApiResponse');
const DataValidator = require('../../../../../helpers/DataValidator');
const validationSchema = require('./countryValidationSchema');


class CountryController {

    static async index(req, res, next) {
        const countries = await models.Country.findAll({}, {
            raw: true
        });
        return ApiResponse.send(req, res, "countries", countries);
    }

    static async create(req, res, next) {
        try {
            DataValidator.validate(req.body, validationSchema.create);
            const country = await models.Country.create(req.body);
            return ApiResponse.send(req, res, "country", country);
        } catch (e) {
            return next(e);
        }
    }

    static async cities(req, res, next) {
        const cities = await models.City.findAll({
            where: {
                countryId: req.params.id
            }
        }, {
            raw: true
        });
        return ApiResponse.send(req, res, "cities", cities);
    }
}

module.exports = CountryController;

const models = require("../../../../../../database/models");
const ApiResponse = require('../../../../../helpers/ApiResponse');
const DataValidator = require('../../../../../helpers/DataValidator');
const validationSchema = require('./languageValidaitonSchema');


class LanguageController {

    // get all cv's languages lookup.
    static async index(req, res, next) {
        const languages = await models.Language.findAll({}, {
            raw: true
        });
        return ApiResponse.send(req, res, "languages", languages);
    }

    // create cv lookup language.
    static async create(req, res, next) {
        try {
            DataValidator.validate(req.body, validationSchema.create);
            const language = await models.Language.create(req.body);
            return ApiResponse.send(req, res, "language", language);
        } catch (e) {
            return next(e);
        }
    }

    static async update(req, res, next) {

    }

    static async delete(req, res, next) {

    }


}

module.exports = LanguageController;
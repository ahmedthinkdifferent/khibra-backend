const models = require("../../../../../../database/models");
const ApiResponse = require('../../../../../helpers/ApiResponse');
const DataValidator = require('../../../../../helpers/DataValidator');
const validationSchema = require('./levelvalidationSchema');


class LanguageLevelController {


    // get all languages levels lookups.
    static async index(req, res, next) {
        const languagesLevels = await models.LanguageLevel.findAll({}, {raw: true});
        return ApiResponse.send(req, res, "languagesLevels", languagesLevels);
    }

    // create new language level.
    static async create(req, res, next) {
        try {
            DataValidator.validate(req.body, validationSchema.create);
            const languageLevel = await models.LanguageLevel.create(req.body);
            return ApiResponse.send(req, res, "languageLevel", languageLevel);
        } catch (e) {
            return next(e);
        }
    }

    static async update(req, res, next) {

    }

    static async delete(req, res, next) {

    }


}

module.exports = LanguageLevelController;
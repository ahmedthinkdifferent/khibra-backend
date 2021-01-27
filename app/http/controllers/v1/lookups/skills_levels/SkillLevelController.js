const models = require("../../../../../../database/models");
const ApiResponse = require('../../../../../helpers/ApiResponse');
const DataValidator = require('../../../../../helpers/DataValidator');
const validationSchema = require('./skillLevelValidationSchema');


class SkillLevelController {

    // get all skills levels lookups.
    static async index(req, res, next) {
        const skillsLevels = await models.SkillLevel.findAll({}, {raw: true});
        return ApiResponse.send(req, res, "skillsLevels", skillsLevels);
    }

    // create new skill level lookup.
    static async create(req, res, next) {
        try {
            DataValidator.validate(req.body, validationSchema.create);
            const skillLevel = await models.SkillLevel.create(req.body);
            return ApiResponse.send(req, res, "skillLevel", skillLevel);
        } catch (e) {
            return next(e);
        }
    }

    static async update(req, res, next) {

    }

    static async delete(req, res, next) {

    }


}

module.exports = SkillLevelController;
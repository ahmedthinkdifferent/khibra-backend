const models = require("../../../../../../database/models");
const ApiResponse = require('../../../../../helpers/ApiResponse');
const DataValidator = require('../../../../../helpers/DataValidator');
const validationSchema = require('./skillValidationSchema');

class SkillController {

    // get all skills lookups.
    static async index(req, res, next) {
        const skills = await models.Skill.findAll({}, {raw: true});
        return ApiResponse.send(req, res, "skills", skills);
    }

    // create new skill lookup.
    static async create(req, res, next) {
        try {
            DataValidator.validate(req.body, validationSchema.create);
            const skill = await models.Skill.create(req.body);
            return ApiResponse.send(req, res, "skill", skill);
        } catch (e) {
            return next(e);
        }
    }

    static async update(req, res, next) {

    }

    static async delete(req, res, next) {

    }


}

module.exports = SkillController;
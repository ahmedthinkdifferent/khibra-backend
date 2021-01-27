const models = require("../../../../../../database/models");
const ApiResponse = require('../../../../../helpers/ApiResponse');
const DataValidator = require('../../../../../helpers/DataValidator');

class CvObjectiveTemplateController {

    static async index(req, res, next) {
        const objectiveTemplates = await models.CvObjectiveTemplate.findAll({}, {
            raw: true
        });
        return ApiResponse.send(req, res, "objectiveTemplates", objectiveTemplates);
    }

    static async create(req, res, next) {

    }

    static async update(req, res, next) {

    }

    static async delete(req, res, next) {

    }


}

module.exports = CvObjectiveTemplateController;
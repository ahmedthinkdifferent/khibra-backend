const models = require("../../../../../../database/models");
const ApiResponse = require('../../../../../helpers/ApiResponse');
const DataValidator = require('../../../../../helpers/DataValidator');

class UniversityController {

    static async index(req, res, next) {
        const universities = await models.UniversityLookup.findAll({}, {
            raw: true
        });
        return ApiResponse.send(req, res, "universities", universities);
    }

    static async create(req, res, next) {

        const u = await models.UniversityLookup.create({name: req.body.name});
        return u;
    }

    static async update(req, res, next) {

    }

    static async delete(req, res, next) {

    }


}

module.exports = UniversityController;
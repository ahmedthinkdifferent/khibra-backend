const models = require("../../../../../../database/models");
const ApiResponse = require('../../../../../helpers/ApiResponse');
const DataValidator = require('../../../../../helpers/DataValidator');
const validationSchema = require('./templateValidationSchema');

// get all cv templates lookup in system .
class CategoryTemplateController {

    static async index(req, res, next) {
        const templates = await models.CvTemplate.findAll({}, {
            raw: true
        });
        return ApiResponse.send(req, res, "templates", templates);
    }

    static async create(req, res, next) {
        try {
            DataValidator.validate(req.body, validationSchema.createUpdate);
            // check if category exists or not.
            await models.CvTemplateCategory.findByPkOrFail(req.body.categoryId, {raw: true});
            const template = await models.CvTemplate.create(req.body);
            return ApiResponse.send(req, res, "template", template);
        } catch (e) {
            return next(e);
        }
    }

    static async update(req, res, next) {
        try {
            DataValidator.validate(req.body, validationSchema.createUpdate);
            // check if category exists or not.
            await models.CvTemplateCategory.findByPkOrFail(req.body.categoryId, {raw: true});
            const template = await models.CvTemplate.findByPkOrFail(req.params.id);
            await template.update(req.body);
            return ApiResponse.send(req, res, "template", template);
        } catch (e) {
            return next(e);
        }
    }

    static async delete(req, res, next) {
        try {
            const template = await models.CvTemplate.findByPkOrFail(req.params.id);
            await template.destroy();
            return ApiResponse.send(req, res);
        } catch (e) {
            return next(e);
        }
    }



    static async categoriesWithTemplates(req, res, next) {
        const categoriesWithTemplates = await models.CvTemplateCategory.findAll({
            include: {
                association: 'templates'
            }
        });
        return ApiResponse.send(req, res, "categoriesWithTemplates", categoriesWithTemplates);
    }
}

module.exports = CategoryTemplateController;
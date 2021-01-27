const ApiResponse = require('../../../../../helpers/ApiResponse');
const DataValidator = require('../../../../../helpers/DataValidator');
const models = require("../../../../../../database/models");
const validationSchema = require('./categoryValidationSchema');

class CvTemplateCategoryController {

    static async index(req, res, next) {
        const categories = await models.CvTemplateCategory.findAll({}, {
            raw: true
        });
        return ApiResponse.send(req, res, "categories", categories);
    }

    static async create(req, res, next) {
        try {
            DataValidator.validate(req.body, validationSchema.createUpdate);
            const category = await models.CvTemplateCategory.create(req.body);
            return ApiResponse.send(req, res, "category", category);
        } catch (e) {
            return next(e);
        }
    }

    static async update(req, res, next) {
        try {
            const category = await models.CvTemplateCategory.findByPkOrFail(req.params.id);
            DataValidator.validate(req.body, validationSchema.createUpdate);
            await category.update(req.body);
            return ApiResponse.send(req, res, "category", category);
        } catch (e) {
            return next(e);
        }
    }

    static async delete(req, res, next) {
        try {
            const category = await models.CvTemplateCategory.findByPkOrFail(req.params.id);
            await category.destroy();
            return ApiResponse.send(req, res);
        } catch (e) {
            return next(e);
        }
    }

    static async categoryTemplates(req, res, next) {
        const templates = await models.CvTemplate.findAll({
            where: {
                categoryId: req.params.categoryId
            },
        }, {
            raw: true
        });
        return ApiResponse.send(req, res, "templates", templates);
    }

}

module.exports = CvTemplateCategoryController;
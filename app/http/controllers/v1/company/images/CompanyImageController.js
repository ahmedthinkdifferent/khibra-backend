const models = require("../../../../../../database/models");
const ApiResponse = require('../../../../../helpers/ApiResponse');
const DataValidator = require('../../../../../helpers/DataValidator');
const validationSchema = require('./companyImageValidationSchema');
const FileSaver = require('../../../../../helpers/FileHelper');

class CompanyImageController {

    // get all company images.
    static async index(req, res, next) {
        try {
            const user = req.user;
            const company = await models.Company.findOrFail({
                where: {
                    userId: user.id
                },
                attributes: ['id']
            });
            const images = await company.getImages();
            return ApiResponse.send(req, res, "images", images);
        } catch (e) {
            return next(e);
        }
    }

    static async create(req, res, next) {
        try {
            const user = req.user;
            const company = await models.Company.findOrFail({
                where: {
                    userId: user.id
                },
                attributes: ['id']
            });
            DataValidator.validate(req.body, validationSchema.save);
            DataValidator.validate(req.files || {}, validationSchema.image);
            const imagePath = await FileSaver.saveFile(req.files.image, "companies/" + company.id);
            const image = await company.createImage({...req.body, image: imagePath});
            return ApiResponse.send(req, res, "image", image);
        } catch (e) {
            return next(e);
        }
    }

    static async delete(req, res, next) {
        try {
            const user = req.user;
            const company = await models.Company.findOrFail({
                where: {
                    userId: user.id
                },
                attributes: ['id']
            });
            const images = await company.getImages({
                where: {
                    id: req.params.id
                }
            });
            if(images.length>0){
                const image = images[0];
                await FileSaver.deleteFile(image.image);
                await image.destroy();
            }
            return ApiResponse.send(req, res);
        } catch (e) {
            return next(e);
        }
    }


}

module.exports = CompanyImageController;
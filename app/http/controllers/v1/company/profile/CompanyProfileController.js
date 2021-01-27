const models = require("../../../../../../database/models");
const ApiResponse = require('../../../../../helpers/ApiResponse');
const DataValidator = require('../../../../../helpers/DataValidator');
const profileValidationSchema = require('./profileValidationSchema');


class CompanyProfileController {

    // get company profile
    static async index(req, res, next) {
        const user = req.user;
        const companyProfile = await models.Company.findOne({
            where: {
                userId: user.id
            },
            include: ["images"]
        }, {
            raw: true
        });
        return ApiResponse.send(req, res, "companyProfile", companyProfile);
    }

    // create or update company profile.
    static async create(req, res, next) {
        try {
            const user = req.user;
            let companyProfile = await models.Company.findOne({
                where: {
                    userId: user.id
                }
            });
            await DataValidator.validate(req.body, profileValidationSchema.createUpdate);
            if (!companyProfile) {
                // create company profile.
                companyProfile = await models.Company.create({...req.body, userId: user.id});
            } else {
                // update company profile.
                await companyProfile.update(req.body);
            }

            return ApiResponse.send(req, res, "companyProfile", companyProfile);
        } catch (e) {
            return next(e);
        }
    }

}

module.exports = CompanyProfileController;
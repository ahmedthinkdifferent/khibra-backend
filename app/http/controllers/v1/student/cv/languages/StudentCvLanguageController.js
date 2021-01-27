const models = require("../../../../../../../database/models");
const ApiResponse = require('../../../../../../helpers/ApiResponse');
const DataValidator = require('../../../../../../helpers/DataValidator');
const validationSchema = require('./languageValidationSchema');
const LanguageHelper = require('./LanguageHelper');
const BadRequestException = require('../../../../../exceptions/BadRequestException');
const LocalizationHelper = require('../../../../../../helpers/LocalizationHelper');


class StudentCvLanguageController {


    // get student cv languages.
    static async index(req, res, next) {
        try {
            const user = req.user;
            const studentWithCv = await StudentCvLanguageController.getStudentCv(user.id, true);
            const languages = studentWithCv.cv.languages;
            return ApiResponse.send(req, res, "languages", languages);
        } catch (e) {
            return next(e);
        }
    }

    // create student cv languages.
    static async create(req, res, next) {
        try {
            const user = req.user;
            const studentWithCv = await StudentCvLanguageController.getStudentCv(user.id, false);
            DataValidator.validate(req.body, validationSchema.createUpdate);
            //3-1 check if languageId , languageLevelId exists in db or not.
            const {languageId, languageLevelId} = req.body;
            await LanguageHelper.checkLanguageExistsInDb(languageId);
            await LanguageHelper.checkLanguageLevelExistsInDb(languageLevelId);
            let language = await models.StudentCvLanguage.create({
                languageId, languageLevelId, cvId: studentWithCv.cv.id
            });
            language = await models.StudentCvLanguage.findOne({
                where: {
                    id: language.id
                },
                include: [
                    {
                        association: 'language'
                    },
                    {
                        association: 'languageLevel'
                    }
                ]
            });
            return ApiResponse.send(req, res, "language", language);
        } catch (e) {
            return next(e);
        }
    }

    static async update(req, res, next) {
        try {
            const user = req.user;
            const studentWithCv = await StudentCvLanguageController.getStudentCv(user.id, false);
            let language = await StudentCvLanguageController.getStudentLanguage(studentWithCv.cv.id, req.params.languageId);
            DataValidator.validate(req.body, validationSchema.createUpdate);
            const {languageId, languageLevelId} = req.body;
            await LanguageHelper.checkLanguageExistsInDb(languageId);
            await LanguageHelper.checkLanguageLevelExistsInDb(languageLevelId);
            // update student language
            await language.update({language, languageLevelId});
            // load foreign keys models.
            const lookupLanguage = await language.getLanguage();
            language.setDataValue("language", lookupLanguage);
            const languageLevel = await language.getLanguageLevel();
            language.setDataValue("languageLevel", languageLevel);
            return ApiResponse.send(req, res, "language", language);
        } catch (e) {
            return next(e);
        }
    }

    static async delete(req, res, next) {
        try {
            const user = req.user;
            const studentWithCv = await StudentCvLanguageController.getStudentCv(user.id, false);
            let language = await StudentCvLanguageController.getStudentLanguage(studentWithCv.cv.id, req.params.languageId);
            await language.destroy();
            return ApiResponse.send(req, res);
        } catch (e) {
            return next(e);
        }
    }


    /**
     *
     * @param  {number} userId
     * @param {boolean} includeLanguages
     * @returns {Promise<{cv}|*>}
     */
    static async getStudentCv(userId, includeLanguages = false) {
        const studentWithCv = await LanguageHelper.getStudentWithCv(userId, includeLanguages);
        if (!studentWithCv.cv) {
            throw new BadRequestException(LocalizationHelper.translate("cv_not_created"));
        }
        return studentWithCv;
    }

    static async getStudentLanguage(cvId, languageId) {
        return await models.StudentCvLanguage.findOrFail({
            where: {
                cvId, id: languageId
            }
        })
    }

}

module.exports = StudentCvLanguageController;
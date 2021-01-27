const models = require("../../../../../../../database/models");
const ApiResponse = require('../../../../../../helpers/ApiResponse');
const DataValidator = require('../../../../../../helpers/DataValidator');
const ExperienceHelper = require('./ExperienceHelper');
const LocalizationHelper = require('../../../../../../helpers/LocalizationHelper');
const validationSchema = require('./experienceValidationSchema');
const BadRequestException = require('../../../../../exceptions/BadRequestException');

class StudentCvExperienceController {

    // get student cv experiences
    static async index(req, res, next) {
        try {
            const user = req.user;
            const studentWithCv = await StudentCvExperienceController.getStudentCv(user.id, true);
            const experiences = studentWithCv.cv.experiences;
            return ApiResponse.send(req, res, "experiences", experiences);
        } catch (e) {
            return next(e);
        }
    }

    // create new student cv experiences.
    static async create(req, res, next) {
        try {
            const user = req.user;
            const studentWithCv = await StudentCvExperienceController.getStudentCv(user.id, false);
            DataValidator.validate(req.body, validationSchema.createUpdate);
            const experience = await models.StudentCvExperience.create({...req.body, cvId: studentWithCv.cv.id});
            return ApiResponse.send(req, res, "experience", experience);
        } catch (e) {
            return next(e);
        }
    }

    static async update(req, res, next) {
        try {
            const user = req.user;
            const studentWithCv = await StudentCvExperienceController.getStudentCv(user.id, false);
            DataValidator.validate(req.body, validationSchema.createUpdate);
            const experience = await StudentCvExperienceController.getStudentExperience(studentWithCv.cv.id, req.params.experienceId);
            await experience.update(req.body);
            return ApiResponse.send(req, res, "experience", experience);
        } catch (e) {
            return next(e);
        }
    }

    static async delete(req, res, next) {
        try {
            const user = req.user;
            const studentWithCv = await StudentCvExperienceController.getStudentCv(user.id, false);
            const experience = await StudentCvExperienceController.getStudentExperience(studentWithCv.cv.id, req.params.experienceId);
            await experience.destroy();
            return ApiResponse.send(req, res);
        } catch (e) {
            return next(e);
        }
    }


    /**
     *
     * @param  {number} userId
     * @param {boolean} includeExperiences
     * @returns {Promise<{cv}|*>}
     */
    static async getStudentCv(userId, includeExperiences = false) {
        const studentWithCv = await ExperienceHelper.getStudentWithCv(userId, includeExperiences);
        if (!studentWithCv.cv) {
            throw new BadRequestException(LocalizationHelper.translate("cv_not_created"));
        }
        return studentWithCv;
    }

    static async getStudentExperience(cvId, experienceId) {
        return await models.StudentCvExperience.findOrFail({
            where: {
                cvId, id: experienceId
            }
        })
    }


}

module.exports = StudentCvExperienceController;
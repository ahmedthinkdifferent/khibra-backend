const models = require("../../../../../../../database/models");
const ApiResponse = require('../../../../../../helpers/ApiResponse');
const DataValidator = require('../../../../../../helpers/DataValidator');
const EducationHelper = require('./EducationHelper');
const LocalizationHelper = require('../../../../../../helpers/LocalizationHelper');
const educationValidationSchema = require('./educationValidationSchema');
const BadRequestException = require('../../../../../exceptions/BadRequestException');

class StudentCvEducationController {

    // get student educations.
    static async index(req, res, next) {
        try {
            const user = req.user;
            // check if student created his cv first before access educations.
            const studentWithCv = await StudentCvEducationController.getStudentCv(user.id, true);
            const educations = studentWithCv.cv.educations;
            return ApiResponse.send(req, res, "educations", educations);
        } catch (e) {
            return next(e);
        }
    }

    // create student educations.
    static async create(req, res, next) {

        try {
            const user = req.user;
            const studentWithCv = await StudentCvEducationController.getStudentCv(user.id, false);
            // 1- validate educations schema.
            // 2- create new educations.
            DataValidator.validate(req.body, educationValidationSchema.createUpdate);
            const education = await models.StudentCvEducation.create({...req.body, cvId: studentWithCv.cv.id});
            return ApiResponse.send(req, res, "education", education);
        } catch (e) {
            return next(e);
        }
    }

    static async update(req, res, next) {
        try {
            const user = req.user;
            const studentWithCv = await StudentCvEducationController.getStudentCv(user.id, false);
            DataValidator.validate(req.body, educationValidationSchema.createUpdate);
            const education = await StudentCvEducationController.getStudentEducation(studentWithCv.cv.id, req.params.educationId);
            await education.update(req.body);
            return ApiResponse.send(req, res, "education", education);
        } catch (e) {
            return next(e);
        }
    }

    static async delete(req, res, next) {
        try {
            const user = req.user;
            const studentWithCv = await StudentCvEducationController.getStudentCv(user.id, false);
            DataValidator.validate(req.body, educationValidationSchema.createUpdate);
            const education = await StudentCvEducationController.getStudentEducation(studentWithCv.cv.id, req.params.educationId);
            await education.destroy();
            return ApiResponse.send(req, res);
        } catch (e) {
            return next(e);
        }
    }


    /**
     *
     * @param  {number} userId
     * @param {boolean} includeEducations
     * @returns {Promise<{cv}|*>}
     */
    static async getStudentCv(userId, includeEducations = false) {
        const studentWithCv = await EducationHelper.getStudentWithCv(userId, includeEducations);
        if (!studentWithCv.cv) {
            throw new BadRequestException(LocalizationHelper.translate("cv_not_created"));
        }
        return studentWithCv;
    }

    static async getStudentEducation(cvId, educationId) {
        return await models.StudentCvEducation.findOrFail({
            where: {
                cvId, id: educationId
            }
        })
    }


}

module.exports = StudentCvEducationController;
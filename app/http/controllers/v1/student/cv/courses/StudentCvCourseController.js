const models = require("../../../../../../../database/models");
const ApiResponse = require('../../../../../../helpers/ApiResponse');
const DataValidator = require('../../../../../../helpers/DataValidator');
const validationSchema = require('./courseValidationSchema');
const LocalizationHelper = require('../../../../../../helpers/LocalizationHelper');
const CourseHelper = require('./CourseHelper');
const BadRequestException = require('../../../../../exceptions/BadRequestException');



class StudentCvCourseController {


    // get student courses.
    static async index(req, res, next) {
        try {
            // check if student has created his cv first before create courses on it.
            const user = req.user;
            const studentWithCv = await StudentCvCourseController.getStudentCv(user.id, true);
            const courses = studentWithCv.cv.courses;
            return ApiResponse.send(req, res, "courses", courses);
        } catch (e) {
            return next(e);
        }
    }


    // create student courses.
    static async create(req, res, next) {
        // check if student has created his cv first before create courses on it.
        const user = req.user;
        const studentWithCv = await StudentCvCourseController.getStudentCv(user.id, false);
        // validate request and create student courses.
        try {
            DataValidator.validate(req.body, validationSchema.createUpdate);
            const course = await models.StudentCvCourse.create({
                ...req.body, cvId: studentWithCv.cv.id
            });
            return ApiResponse.send(req, res, "course", course);
        } catch (e) {
            return next(e);
        }


    }


    static async update(req, res, next) {
        try {
            const user = req.user;
            const studentWithCv = await StudentCvCourseController.getStudentCv(user.id, false);
            DataValidator.validate(req.body, validationSchema.createUpdate);
            const course = await models.StudentCvCourse.findOrFail({
                where: {
                    id: req.params.courseId,
                    cvId: studentWithCv.cv.id
                }
            });
            await course.update({
                ...req.body
            });
            return ApiResponse.send(req, res, "course", course);
        } catch (e) {
            return next(e);
        }
    }


    static async delete(req, res, next) {
        try {
            const user = req.user;
            const studentWithCv = await StudentCvCourseController.getStudentCv(user.id, false);
            const course = await models.StudentCvCourse.findOrFail({
                where: {
                    id: req.params.courseId,
                    cvId: studentWithCv.cv.id
                }
            });
            await course.destroy();
            return ApiResponse.send(req, res);
        } catch (e) {
            return next(e);
        }
    }


    /**
     *
     * @param  {number} userId
     * @param {boolean} includeCourses
     * @returns {Promise<{cv}|*>}
     */
    static async getStudentCv(userId, includeCourses = false) {
        const studentWithCv = await CourseHelper.getStudentWithCv(userId, includeCourses);
        if (!studentWithCv.cv) {
            throw new BadRequestException(LocalizationHelper.translate("cv_not_created"));
        }
        return studentWithCv;
    }

}

module.exports = StudentCvCourseController;
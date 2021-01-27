const ApiResponse = require('../../../../helpers/ApiResponse');
const ApiResponseCode = require('../../../../constants/ApiResponseCode');
const DataValidator = require('../../../../helpers/DataValidator');
const models = require("../../../../../database/models");
const validationSchema = require('./studentValidationSchema');
const DbHelper = require('../../../../helpers/DbHelper');
const studentService = require("./StudentService");


const createStudent = async (req, res, next) => {
    try {
        const user = req.user;
        DataValidator.validate(req.body, validationSchema.createUpdate);
        await DbHelper.checkRowExistence(models.UniversityLookup, {id: req.body.universityId});
        await DbHelper.checkRowNotExistence(models.Student, {userId: req.user.id});
        // check if phone exists.
        if (req.body.phone) {
            const phoneExists = await models.Student.findOne({
                where: {
                    phone: req.body.phone
                }
            }, {
                raw: true
            });
            if (phoneExists) {
                return ApiResponse.sendError(req, res, ApiResponseCode.BAD_REQUEST, 400, "Phone exists before");
            }
        }
        let student = await studentService.create({...req.body, userId: user.id});
        await models.User.update({
            phone: student.phone, isVerified: false, phoneCode: "123456"
        }, {
            where: {
                id: user.id
            }
        });
        student = await models.Student.findOne({
            where: {
                id: student.id
            },
            include: [
                {
                    association: 'personalInformation'
                }, {
                    association: 'cv',
                    include: [{
                        association: 'template',
                        include: ['template']
                    }, {
                        association: 'courses'
                    }, {
                        association: 'educations'
                    }, {
                        association: 'experiences'
                    }, {
                        association: 'languages',
                        include: [{
                            association: "language"
                        }, {
                            association: 'languageLevel'
                        }]
                    }, {
                        association: 'skills',
                        include: [{
                            association: "skill"
                        }, {
                            association: "skillLevel"
                        }]
                    }, {
                        association: 'objective'
                    }]
                }]
        }, {raw: true});
        //TODO send phone code.
        return ApiResponse.send(req, res, "student", student);
    } catch (error) {
        next(error);
    }
};

const getStudentDetails = async (req, res, next) => {
    try {
        const {userId} = req.params;
        await models.User.findByPkOrFail(userId, {raw: true});
        const studentDetails = await studentService.getDetails(userId);
        return ApiResponse.send(req, res, "studentDetails", studentDetails);
    } catch (e) {
        return next(e);
    }
};

const updateStudent = async (req, res, next) => {
    try {
        const {userId} = req.params;
        DataValidator.validate(req.body, validationSchema.createUpdate);
        await DbHelper.checkRowExistence("UniversityLookup", {id: req.body.universityId});
        await models.User.findByPkOrFail(userId, {raw: true});
        let student = await studentService.getDetails(userId);
        await student.update(req.body);
        student = await models.Student.findOne({
            where: {
                id: student.id
            },
            include: [
                {
                    association: 'personalInformation'
                }, {
                    association: 'cv',
                    include: [{
                        association: 'template',
                        include: ['template']
                    }, {
                        association: 'courses'
                    }, {
                        association: 'educations'
                    }, {
                        association: 'experiences'
                    }, {
                        association: 'languages',
                        include: [{
                            association: "language"
                        }, {
                            association: 'languageLevel'
                        }]
                    }, {
                        association: 'skills',
                        include: [{
                            association: "skill"
                        }, {
                            association: "skillLevel"
                        }]
                    }, {
                        association: 'objective'
                    }]
                }]
        }, {raw: true});
        return ApiResponse.send(req, res, "student", student);
    } catch (e) {
        return next(e);
    }
};

module.exports = {
    createStudent,
    getStudentDetails,
    updateStudent
};

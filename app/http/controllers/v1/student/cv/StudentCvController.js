const models = require("../../../../../../database/models");
const ApiResponse = require('../../../../../helpers/ApiResponse');
const DataValidator = require('../../../../../helpers/DataValidator');
const studentCvSchema = require('./studentCvSchema');
const LocalizationHelper = require('../../../../../helpers/LocalizationHelper');

class StudentCvController {

    static async index(req, res, next) {
        // return student cv with all information.
        const user = req.user;
        const studentWithCv = await models.Student.findOrFail({
            where: {
                userId: user.id
            },
            include: [{
                association: 'personalInformation',
                include: [{
                    association: "country"
                }
                    , {
                        association: "nationality"
                    }
                ]
            },
                {
                    association: "cv",
                    include: [{
                        association: "template",
                        include: {
                            association: 'template'
                        }
                    },
                        {
                            association: "courses"
                        },
                        {
                            association: "educations"
                        },
                        {
                            association: "experiences"
                        },
                        {
                            association: "languages",
                            include: [
                                {
                                    association: "language"
                                }, {
                                    association: "languageLevel"
                                }
                            ]
                        },
                        {
                            association: "skills",
                            include: [{
                                association: "skill"
                            }, {
                                association: "skillLevel"
                            }]
                        }
                    ]
                }
            ]
        }, {
            raw: true
        });
        return ApiResponse.send(req, res, "studentWithCv", studentWithCv);
    }

    static async create(req, res, next) {
        try {
            const user = req.user;
            // check if student exists or not.
            const student = await models.Student.findOrFail({
                where: {
                    userId: user.id
                }
            }, {
                raw: true
            });

            DataValidator.validate(req.body, studentCvSchema.create);
            const {templateId} = req.body;
            // check if template exists or not.
            const template = await models.CvTemplate.findByPkOrFail(templateId);
            // check if user cv created before , and throw exception if exists before because every student must have
            // only one cv.
            let studentCv = await models.StudentCv.findOne({
                where: {
                    studentId: student.id
                }
            });
            if (studentCv) {
                // update student cv.
                await models.StudentCvTemplate.update({
                    templateId: templateId
                }, {
                    where: {
                        cvId: studentCv.id
                    }
                });
            } else {
                // create new cv for student with template.
                studentCv = await models.StudentCv.create({
                    studentId: student.id,
                    name: student.fullName()
                });
                // create cv template.
                await models.StudentCvTemplate.create({
                    color: template.defaultColor,
                    cvId: studentCv.id,
                    templateId: templateId
                });
            }
            const studentCvJson = studentCv.toJSON();
            studentCvJson.template = await models.StudentCvTemplate.findOne({
                where: {
                    id: templateId
                },
                include: ['template']
            }, {raw: true});
            return ApiResponse.sendFromOptions(req, res, {
                message: LocalizationHelper.translate("cv_created"),
                dataKey: "cv",
                data: studentCvJson
            });
        } catch (e) {
            return next(e);
        }

    }

    static async setCvComplete(req, res, next) {
        const user = req.user;
        const student = await models.Student.findOrFail({
            where:{
                userId:user.id
            }
        })
        const cv = await models.StudentCv.findOrFail({
            where: {
                studentId: student.id
            }
        });
        cv.isCvCompleted = true;
        await cv.save();
        return ApiResponse.send(req, res);
    }


}

module.exports = StudentCvController;
const models = require("../../../../../../../database/models");
const ApiResponse = require('../../../../../../helpers/ApiResponse');
const DataValidator = require('../../../../../../helpers/DataValidator');
const validationSchema = require('./personalInformationValidation');
const LocalizationHelper = require('../../../../../../helpers/LocalizationHelper');


class StudentPersonalInformationController {

    static async index(req, res, next) {

    }

    static async create(req, res, next) {
        try {
            const user = req.user;
            //get student related to user.
            const student = await models.Student.findOrFail({
                where: {
                    userId: user.id
                }
            });

            //1-validate create student cv personal information ,2-check if nationality exists in db
            DataValidator.validate(req.body, validationSchema.create);
            await models.Country.findByPkOrFail(req.body.nationalityId);
            //2- check if user created his personal information before , if exists update data else create new record.
            const studentPersonalInformation = await models.StudentPersonalInformation.findOne({
                where: {
                    studentId: student.id
                }
            });


            const body = req.body;
            // update student personal information.
            await student.update({
                firstName: body.firstName,
                midName: body.midName,
                lastName: body.lastName
            });

            if (studentPersonalInformation) {
                await studentPersonalInformation.update({
                    birthDate: body.birthDate,
                    nationalityId: body.nationalityId,
                    countryId: body.countryId,
                    address: body.address,
                    city: body.city,
                    zipCode: body.zipCode,
                    backupMail: body.email,
                    phone: body.phone
                });
                const studentResponse = student.toJSON();
                studentResponse.personalInformation = studentPersonalInformation;
                return ApiResponse.sendFromOptions(req, res, {
                    message: LocalizationHelper.translate("data_updated"),
                    dataKey: "student",
                    data: studentResponse
                });
            } else {
                // create new student personal information.
                const studentPersonalInformation = await models.StudentPersonalInformation.create({
                    birthDate: body.birthDate,
                    nationalityId: body.nationalityId,
                    countryId: body.countryId,
                    address: body.address,
                    city: body.city,
                    zipCode: body.zipCode,
                    studentId: student.id,
                    backupMail: body.email,
                    phone: body.phone
                });

                const studentRes = await models.Student.findOne({
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

                return ApiResponse.sendFromOptions(req, res, {
                    message: LocalizationHelper.translate("data_created"),
                    dataKey: "student",
                    data: studentRes
                });
            }
        } catch (e) {
            return next(e);
        }

    }

}

module.exports = StudentPersonalInformationController;
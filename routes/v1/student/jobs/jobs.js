const USerAuth = require('../../../../app/http/middlewares/UserAuthenticationMiddleware');
const models = require('../../../../database/models/index');
const ApiResponse = require('../../../../app/helpers/ApiResponse');
const DataValidator = require('../../../../app/helpers/DataValidator');
const Joi = require("joi");
const Exception = require('../../../../app/http/exceptions/BadRequestException');

module.exports = (router) => {
    router.get("/students/jobs", [USerAuth.auth], async function (req, res, next) {
        const user = req.user;
        const student = await models.Student.findOne({
            where: {
                userId: user.id
            }
        }, {
            raw: true
        });
        const title = req.query.title;
        const countryOrCity = req.query.countryOrCity;
        const whereClause = {};
        if (title) {
            whereClause.title = {
                [models.Sequelize.Op.like]: "%" + title + "%"
            };
        }
        if (countryOrCity) {
            const countriesIds = await models.Country.findAll({
                where: {
                    name: {
                        [models.Sequelize.Op.like]: `%${countryOrCity}%`
                    }
                },
                attributes: ['id']
            }, {raw: true}).then(data => {
                return data.map((c) => {
                    return c.id;
                });
            });
            const citiesIds = await models.City.findAll({
                where: {
                    name: {
                        [models.Sequelize.Op.like]: `%${countryOrCity}%`
                    },
                },
                attributes: ['id']
            }, {raw: true}).then((data) => {
                return data.map((c) => {
                    return c.id;
                });
            });
            const locationsWhere = {};
            if (countriesIds.length > 0) {
                locationsWhere.countryId = countriesIds;
            }
            if (citiesIds.length > 0) {
                locationsWhere.cityId = citiesIds;
            }
            whereClause.workLocationId = await models.CompanyLocation.findAll({
                where: {
                    [models.Sequelize.Op.or]: locationsWhere
                },
                attributes: ['id']
            }).then((d) => {
                return d.map(function (location) {
                    return location.id;
                });
            });
        }
        const jobs = await models.CompanyJob.findAll({
            where: whereClause,
            include: [{
                association: 'availability'
            }, {
                association: 'workLocation',
                include: [{
                    association: 'city'
                }]
            }, {
                association: 'duration'
            }, {
                association: "yearsOfExperience"
            }]
        }, {raw: true});
        // check if student apply for job before.
        for (let job of jobs) {
            const jobApplication = await models.JobApplication.findOne({
                where: {
                    jobId: job.id,
                    studentId:student.id
                }
            });
            job.setDataValue("jobApplication", jobApplication);
        }
        return ApiResponse.send(req, res, "jobs", jobs);
    });

    router.post("/students/jobs", [USerAuth.auth], async function (req, res, next) {
        const student = await models.Student.findOrFail({
            where: {
                userId: req.user.id
            }
        }, {
            raw: true
        });
        const validationSchema = Joi.object({
            email: Joi.string().email({tlds: {allow: false}}).required(),
            cvId: Joi.number().required(),
            phoneCode: Joi.string().required(),
            phone: Joi.string().required(),
            jobId: Joi.number().required()
        });
        try {
            DataValidator.validate(req.body, validationSchema);
            const jobApplication = await models.JobApplication.create({
                ...req.body,
                studentId: student.id,
                status: "PENDING"
            });
            return ApiResponse.send(req, res, "jobApplication", jobApplication);
        } catch (e) {
            next(e);
        }
    });

};
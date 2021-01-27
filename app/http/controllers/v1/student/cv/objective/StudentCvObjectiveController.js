const models = require("../../../../../../../database/models");
const ApiResponse = require('../../../../../../helpers/ApiResponse');
const DataValidator = require('../../../../../../helpers/DataValidator');
const objectiveValidation = require('./objectiveValidation');

class StudentCvObjectiveController {

    static async create(req, res, next) {
        try {
            const user = req.user;
            // find student.
            const student = await models.Student.findOrFail({
                where: {
                    userId: user.id
                }
            }, {
                raw: true
            });
            // find student cv.
            const studentCv = await models.StudentCv.findOrFail({
                where: {
                    studentId: student.id
                },
                attributes: ['id']
            }, {
                raw: true
            });

            DataValidator.validate(req.body, objectiveValidation.create);

            let studentCvObjective = await models.StudentCvObjective.findOne({
                where: {
                    cvId: studentCv.id
                }
            });
            if (studentCvObjective) {
                // update
                await studentCvObjective.update({
                    objective: req.body.objective
                })
            } else {
                // create
                studentCvObjective = await models.StudentCvObjective.create({
                    objective: req.body.objective,
                    cvId: studentCv.id
                })
            }

            return ApiResponse.send(req, res, "objective", studentCvObjective);
        } catch (e) {
            return next(e);
        }
    }

    static async update(req, res, next) {

    }

    static async delete(req, res, next) {

    }


}

module.exports = StudentCvObjectiveController;
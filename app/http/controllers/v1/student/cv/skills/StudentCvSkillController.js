const models = require("../../../../../../../database/models");
const ApiResponse = require('../../../../../../helpers/ApiResponse');
const DataValidator = require('../../../../../../helpers/DataValidator');
const validationSchema = require('./skillValidationSchema');
const SkillHelper = require('./SkillHelper');
const BadRequestException = require('../../../../../exceptions/BadRequestException');
const LocalizationHelper = require("../../../../../../helpers/LocalizationHelper");


class StudentCvSkillController {

    // get student cv skills.
    static async index(req, res, next) {
        try {
            const user = req.user;
            const studentWithCv = await StudentCvSkillController.getStudentCv(user.id, true);
            const skills = studentWithCv.cv.skills;
            return ApiResponse.send(req, res, "skills", skills);
        } catch (e) {
            return next(e);
        }
    }

    // create student cv skills.
    static async create(req, res, next) {
        const user = req.user;
        const studentWithCv = await StudentCvSkillController.getStudentCv(user.id, false);

        //1-validate student skill cv creation.
        //2- create new student cv skills.
        try {
            DataValidator.validate(req.body, validationSchema.createUpdate);
            const {skillId, skillLevelId} = req.body;
            await SkillHelper.checkSkillExistsInDb(skillId);
            await SkillHelper.checkSkillLevelExistsInDb(skillLevelId);
            let skill = await models.StudentCvSkill.create({
                skillId, skillLevelId, cvId: studentWithCv.cv.id
            }, {
                raw: true
            });
            skill = await models.StudentCvSkill.findByPk(skill.id, {
                include: [{
                    association: 'skill'
                }, {
                    association: 'skillLevel'
                }]
            }, {
                raw: true
            });
            return ApiResponse.send(req, res, "skill", skill);
        } catch (e) {
            return next(e);
        }
    }

    static async update(req, res, next) {
        try {
            const user = req.user;
            const studentWithCv = await StudentCvSkillController.getStudentCv(user.id, false);
            let skill = await StudentCvSkillController.getStudentCvSkill(studentWithCv.cv.id, req.params.skillId);
            DataValidator.validate(req.body, validationSchema.createUpdate);
            const {skillId, skillLevelId} = req.body;
            await SkillHelper.checkSkillExistsInDb(skillId);
            await SkillHelper.checkSkillLevelExistsInDb(skillLevelId);
            await skill.update({
                skillId,
                skillLevelId
            });
            skill = await models.StudentCvSkill.findByPk(skill.id, {
                include: [{
                    association: 'skill'
                }, {
                    association: 'skillLevel'
                }]
            });
            return ApiResponse.send(req, res, "skill", skill);
        } catch (e) {
            return next(e);
        }
    }


    static async delete(req, res, next) {
        try {
            const user = req.user;
            const studentWithCv = await StudentCvSkillController.getStudentCv(user.id, false);
            let skill = await StudentCvSkillController.getStudentCvSkill(studentWithCv.cv.id, req.params.skillId);
            await skill.destroy();
            return ApiResponse.send(req, res);
        } catch (e) {
            return next(e);
        }
    }


    /**
     *
     * @param  {number} userId
     * @param {boolean} includeSkillsWithCv
     * @returns {Promise<{cv}|*>}
     */
    static async getStudentCv(userId, includeSkillsWithCv = false) {
        const studentWithCv = await SkillHelper.getStudentWithCv(userId, includeSkillsWithCv);
        if (!studentWithCv.cv) {
            throw BadRequestException(LocalizationHelper.translate("cv_not_created"));
        }
        return studentWithCv;
    }

    /**
     *
     * @param {number} studentCvId
     * @param {number} skillId
     * @returns {Promise<void>}
     */
    static async getStudentCvSkill(studentCvId, skillId) {
        return await models.StudentCvSkill.findOrFail({
            where: {
                cvId: studentCvId,
                id: skillId
            }
        });
    }


}

module.exports = StudentCvSkillController;
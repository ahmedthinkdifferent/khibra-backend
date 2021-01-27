const models = require("../../../../../../../database/models");

class SkillHelper {

    static async getStudentWithCv(userId, includeSkills = false) {
        const whereClause = {
            where: {
                userId
            },
            attributes: ['id'],
            include: {
                association: 'cv',
                attributes: ['id']
            }
        };
        if (includeSkills) {
            whereClause.include.include = {
                association: 'skills',
                include: [{
                    association: 'skill'
                }, {
                    association: 'skillLevel'
                }]
            }
        }
        return await models.Student.findOrFail(whereClause, {
            raw: true
        });
    }


    static async checkSkillExistsInDb(skillId) {
        await models.Skill.findByPkOrFail(skillId);
    }

    static async checkSkillLevelExistsInDb(skillLevelId) {
        await models.SkillLevel.findByPkOrFail(skillLevelId);
    }

}

module.exports = SkillHelper;
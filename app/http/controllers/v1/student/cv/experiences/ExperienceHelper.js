const models = require("../../../../../../../database/models");

class ExperienceHelper {

    static async getStudentWithCv(userId , includeExperiences = false){
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
        if (includeExperiences) {
            whereClause.include.include = {
                association: 'experiences'
            }
        }
        return await models.Student.findOrFail(whereClause, {
            raw: true
        });
    }

}

module.exports = ExperienceHelper;
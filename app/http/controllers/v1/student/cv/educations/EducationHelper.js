const models = require("../../../../../../../database/models");

class EducationHelper {

    static async getStudentWithCv(userId , includeEducations = false){
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
        if (includeEducations) {
            whereClause.include.include = {
                association: 'educations'
            }
        }
        return await models.Student.findOrFail(whereClause, {
            raw: true
        });
    }

}

module.exports = EducationHelper;
const models = require("../../../../../../../database/models");

class CourseHelper {


    static async getStudentWithCv(userId, includeCourses = false) {
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
        if (includeCourses) {
            whereClause.include.include = {
                association: 'courses'
            }
        }
        return await models.Student.findOrFail(whereClause, {
            raw: true
        });
    }
}

module.exports = CourseHelper;
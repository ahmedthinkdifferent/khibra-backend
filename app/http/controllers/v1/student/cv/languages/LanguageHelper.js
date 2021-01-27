const models = require("../../../../../../../database/models");

class LanguageHelper {

    static async getStudentWithCv(userId, includeLanguages = false) {
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
        if (includeLanguages) {
            whereClause.include.include = {
                association: 'languages',
                include: [{
                    association: 'language'
                }, {
                    association: 'languageLevel'
                }]
            }
        }
        return await models.Student.findOrFail(whereClause, {
            raw: true
        });
    }


    static async checkLanguageExistsInDb(languageId) {
        await models.Language.findByPkOrFail(languageId);
    }

    static async checkLanguageLevelExistsInDb(languageLevelId) {
        await models.LanguageLevel.findByPkOrFail(languageLevelId);
    }

}

module.exports = LanguageHelper;
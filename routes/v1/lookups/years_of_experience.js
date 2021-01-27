const models = require('../../../database/models/index');
const ApiResponse = require('../../../app/helpers/ApiResponse');

module.exports = (router) => {
    router.get("/years_of_experience", async function (req, res, next) {
        const yearsOfExperience = await models.YearsOfExperienceLookup.findAll({}, {raw: true});
        return ApiResponse.send(req, res, "yearsOfExperience", yearsOfExperience);
    });
};
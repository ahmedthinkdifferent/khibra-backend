const models = require('../../../database/models/index');
const ApiResponse = require('../../../app/helpers/ApiResponse');

module.exports = (router) => {
    router.get("/majors", async function (req, res, next) {
        const majors = await models.MajorLookup.findAll({}, {raw: true});
        return ApiResponse.send(req, res, "majors", majors);
    });
};
const models = require('../../../database/models/index');
const ApiResponse = require('../../../app/helpers/ApiResponse');

module.exports = (router) => {
    router.get("/work_fields", async function (req, res, next) {
        const workFields = await models.WorkFieldLookup.findAll({}, {raw: true});
        return ApiResponse.send(req, res, "workFields", workFields);
    });
};
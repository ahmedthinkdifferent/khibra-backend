const models = require('../../../database/models/index');
const ApiResponse = require('../../../app/helpers/ApiResponse');

module.exports = (router) => {
    router.get("/job_types", async function (req, res, next) {
        const availabilityTypes = await models.JobAvailabilityLookup.findAll({}, {raw: true});
        return ApiResponse.send(req, res, "availabilityTypes", availabilityTypes);
    });
};
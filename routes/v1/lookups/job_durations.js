const models = require('../../../database/models/index');
const ApiResponse = require('../../../app/helpers/ApiResponse');

module.exports = (router) => {
    router.get("/job_durations", async function (req, res, next) {
        const jobDurations = await models.JobDurationLookup.findAll({}, {raw: true});
        return ApiResponse.send(req, res, "jobDurations", jobDurations);
    });
};
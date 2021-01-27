const CvObjectiveTemplateController = require("../../../app/http/controllers/v1/lookups/cv_objective_templates/CvObjectiveTemplateController");

module.exports = (router) => {
    router.get("/cv_objective_templates", CvObjectiveTemplateController.index);
};
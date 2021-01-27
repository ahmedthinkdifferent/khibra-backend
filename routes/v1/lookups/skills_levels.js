const SkillLevelController = require("../../../app/http/controllers/v1/lookups/skills_levels/SkillLevelController");

module.exports = (router) => {
    router.get("/skills_levels", SkillLevelController.index);
    router.post("/skills_levels", SkillLevelController.create);
};
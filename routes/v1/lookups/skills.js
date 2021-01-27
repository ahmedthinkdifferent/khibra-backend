const SkillController = require("../../../app/http/controllers/v1/lookups/skills/SkillController");

module.exports = (router) => {
    router.get("/skills", SkillController.index);
    router.post("/skills", SkillController.create);
};
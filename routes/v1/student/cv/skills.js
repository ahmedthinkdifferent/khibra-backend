const StudentCvSkillController = require("../../../../app/http/controllers/v1/student/cv/skills/StudentCvSkillController");
const AuthMiddleware = require('../../../../app/http/middlewares/UserAuthenticationMiddleware');


module.exports = (router) => {
    router.get("/cv/skills", [AuthMiddleware.auth], StudentCvSkillController.index);
    router.post("/cv/skills", [AuthMiddleware.auth], StudentCvSkillController.create);
    router.put("/cv/skills/:skillId(\\d+)", [AuthMiddleware.auth], StudentCvSkillController.update);
    router.delete("/cv/skills/:skillId(\\d+)", [AuthMiddleware.auth], StudentCvSkillController.delete);
};
const StudentCvExperienceController = require("../../../../app/http/controllers/v1/student/cv/experiences/StudentCvExperienceController");
const AuthMiddleware = require('../../../../app/http/middlewares/UserAuthenticationMiddleware');


module.exports = (router) => {
    router.get("/cv/experiences", [AuthMiddleware.auth], StudentCvExperienceController.index);
    router.post("/cv/experiences", [AuthMiddleware.auth], StudentCvExperienceController.create);
    router.put("/cv/experiences/:experienceId(\\d+)", [AuthMiddleware.auth], StudentCvExperienceController.update);
    router.delete("/cv/experiences/:experienceId(\\d+)", [AuthMiddleware.auth], StudentCvExperienceController.delete);
};
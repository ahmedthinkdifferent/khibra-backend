const StudentCvEducationController = require("../../../../app/http/controllers/v1/student/cv/educations/StudentCvEducationController");
const AuthMiddleware = require('../../../../app/http/middlewares/UserAuthenticationMiddleware');


module.exports = (router) => {
    router.get("/cv/educations", [AuthMiddleware.auth], StudentCvEducationController.index);
    router.post("/cv/educations", [AuthMiddleware.auth], StudentCvEducationController.create);
    router.put("/cv/educations/:educationId(\\d+)", [AuthMiddleware.auth], StudentCvEducationController.update);
    router.delete("/cv/educations/:educationId(\\d+)", [AuthMiddleware.auth], StudentCvEducationController.delete);
};
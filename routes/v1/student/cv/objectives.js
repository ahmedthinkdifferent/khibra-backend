const StudentCvObjectiveController = require("../../../../app/http/controllers/v1/student/cv/objective/StudentCvObjectiveController");
const AuthMiddleware = require('../../../../app/http/middlewares/UserAuthenticationMiddleware');


module.exports = (router) => {
    router.post("/cv/objectives", [AuthMiddleware.auth], StudentCvObjectiveController.create);
};
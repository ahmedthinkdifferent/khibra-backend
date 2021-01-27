const StudentCvController = require("../../../../app/http/controllers/v1/student/cv/StudentCvController");
const middleware = require('../../../../app/http/middlewares/UserAuthenticationMiddleware');
module.exports = (router) => {
    router.get("/cv", [middleware.auth], StudentCvController.index);
    router.post("/cv", [middleware.auth], StudentCvController.create);
    router.put("/cv/:id(\\d+)/completed", [middleware.auth], StudentCvController.setCvComplete);
};
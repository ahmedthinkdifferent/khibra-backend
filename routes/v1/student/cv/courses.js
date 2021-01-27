const StudentCvCourseController = require("../../../../app/http/controllers/v1/student/cv/courses/StudentCvCourseController");
const AuthMiddleware = require('../../../../app/http/middlewares/UserAuthenticationMiddleware');


module.exports = (router) => {
    router.get("/cv/courses", [AuthMiddleware.auth], StudentCvCourseController.index);
    router.post("/cv/courses", [AuthMiddleware.auth], StudentCvCourseController.create);
    router.put("/cv/courses/:courseId(\\d+)", [AuthMiddleware.auth], StudentCvCourseController.update);
    router.delete("/cv/courses/:courseId(\\d+)", [AuthMiddleware.auth], StudentCvCourseController.delete);
};
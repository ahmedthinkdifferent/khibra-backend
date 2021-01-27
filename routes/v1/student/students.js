const studentController = require("../../../app/http/controllers/v1/student/StudentController");
const USerAuth = require('../../../app/http/middlewares/UserAuthenticationMiddleware');

module.exports = (router) => {
    router.post("/students",[USerAuth.auth], studentController.createStudent);
    router.get("/students/:userId(\\d+)", studentController.getStudentDetails);
    router.put("/students/:userId(\\d+)", studentController.updateStudent);
};
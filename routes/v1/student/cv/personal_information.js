const StudentPersonalInformationController = require("../../../../app/http/controllers/v1/student/cv/personal_information/StudentPersonalInformationController");
const middleware = require('../../../../app/http/middlewares/UserAuthenticationMiddleware');
module.exports = (router) => {
    router.post("/cv/personal_information", [middleware.auth], StudentPersonalInformationController.create);
};
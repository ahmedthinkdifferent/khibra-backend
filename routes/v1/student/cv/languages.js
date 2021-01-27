const StudentCvLanguageController = require("../../../../app/http/controllers/v1/student/cv/languages/StudentCvLanguageController");
const AuthMiddleware = require('../../../../app/http/middlewares/UserAuthenticationMiddleware');


module.exports = (router) => {
    router.get("/cv/languages", [AuthMiddleware.auth], StudentCvLanguageController.index);
    router.post("/cv/languages", [AuthMiddleware.auth], StudentCvLanguageController.create);
    router.put("/cv/languages/:languageId(\\d+)", [AuthMiddleware.auth], StudentCvLanguageController.update);
    router.delete("/cv/languages/:languageId(\\d+)", [AuthMiddleware.auth], StudentCvLanguageController.delete);
};
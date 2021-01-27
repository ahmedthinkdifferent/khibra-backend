const FileUploaderController = require("../../../app/http/controllers/v1/uploader/FileUploaderController");
const UserAuthMiddleware = require('../../../app/http/middlewares/UserAuthenticationMiddleware');
module.exports = (router) => {
    router.post("/uploader",[UserAuthMiddleware.auth], FileUploaderController.upload);
};
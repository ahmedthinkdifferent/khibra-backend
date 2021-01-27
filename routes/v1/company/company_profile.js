const CompanyProfileController = require("../../../app/http/controllers/v1/company/profile/CompanyProfileController");
const UserAuth = require('../../../app/http/middlewares/UserAuthenticationMiddleware');
const canAccessRoute = require('../../../app/http/middlewares/canAccessRouteMiddleware');
const UserTypeConst = require('../../../app/constants/UserTypeConst');


module.exports = (router) => {
    router.get("/companies/profile", [UserAuth.auth, canAccessRoute([UserTypeConst.COMPANY])], CompanyProfileController.index);
    router.post("/companies/profile", [UserAuth.auth, canAccessRoute([UserTypeConst.COMPANY])], CompanyProfileController.create);
};
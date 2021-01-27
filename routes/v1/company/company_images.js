const CompanyImageController = require("../../../app/http/controllers/v1/company/images/CompanyImageController");
const UserAuth = require("../../../app/http/middlewares/UserAuthenticationMiddleware");
const canAccessRoute = require("../../../app/http/middlewares/canAccessRouteMiddleware");
const UserTypeConst = require("../../../app/constants/UserTypeConst");

module.exports = (router) => {
  router.get(
    "/companies/images",
    [UserAuth.auth, canAccessRoute([UserTypeConst.COMPANY])],
    CompanyImageController.index
  );
  router.post(
    "/companies/images",
    [UserAuth.auth, canAccessRoute([UserTypeConst.COMPANY])],
    CompanyImageController.create
  );
  router.delete(
    "/companies/images/:id(\\d+)",
    [UserAuth.auth, canAccessRoute([UserTypeConst.COMPANY])],
    CompanyImageController.delete
  );
};

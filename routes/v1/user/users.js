const UserController = require("../../../app/http/controllers/v1/user/UserController");

module.exports = (router) => {
  router.post("/users/register", UserController.register);
  router.post("/users/login", UserController.login);
};

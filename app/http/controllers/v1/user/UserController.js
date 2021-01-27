const validationSchema = require("./validationSchema");
const DataValidator = require("../../../../helpers/DataValidator");
const ApiResponse = require("../../../../helpers/ApiResponse");
const UserService = require("./UserService");

class UserController {
  static async register(req, res, next) {
    try {
      DataValidator.validate(req.body, validationSchema.register);
      await UserService.register(req.body);
      return ApiResponse.send(req, res);
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      DataValidator.validate(req.body, validationSchema.login);
      const user = await UserService.login(req.body);
      return ApiResponse.send(req, res, "user", user);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;

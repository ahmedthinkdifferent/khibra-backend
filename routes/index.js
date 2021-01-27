const ExceptionHandler = require("./ExceptionHandler");
const apiV1 = require("./v1/index");
module.exports = (server) => {
  server.use("/api/v1", apiV1);
  server.all("*", (req, res) => {
    return res.status(404).send({
      message: "Error not found",
    });
  });
  server.use(ExceptionHandler.handleExceptions);
  // catch all not handled exceptions.
  process.on("unhandledRejection", (error, p) => {
    console.log(JSON.stringify(error));
    //TODO send email with failure reason.
    process.exit(1);
  });
};

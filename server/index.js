const cors = require("cors");
const express = require("express");
const fileUpload = require("express-fileupload");

const server = express();
server.use(express.json());
server.use(
  fileUpload({
    limits: { fileSize: 3 * 1024 * 1024 }, //fileSize max in bytes .{3 MB}
  })
);

// enable cors in not productions environment.
if (process.env.NODE_ENV !== "production") {
  server.use(cors());
}
require("../routes/index")(server);

module.exports = server;

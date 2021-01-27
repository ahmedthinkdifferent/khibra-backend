const UniversityController = require("../../../app/http/controllers/v1/lookups/universities/UniversityController");

module.exports = (router) => {
    router.get("/universities_lookup", UniversityController.index);
};
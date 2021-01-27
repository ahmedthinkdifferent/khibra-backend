const CountryController = require("../../../app/http/controllers/v1/lookups/countries/CountryController");

module.exports = (router) => {
    router.get("/countries", CountryController.index);
    router.post("/countries", CountryController.create);
    router.get("/countries/:id(\\d+)/cities", CountryController.cities);
};
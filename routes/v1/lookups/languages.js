const LanguageController = require("../../../app/http/controllers/v1/lookups/languages/LanguageController");

module.exports = (router) => {
    router.get("/languages", LanguageController.index);
    router.post("/languages", LanguageController.create);
};
const LanguageLevelController = require("../../../app/http/controllers/v1/lookups/languages_levels/LanguageLevelController");

module.exports = (router) => {
    router.get("/languages_levels", LanguageLevelController.index);
    router.post("/languages_levels", LanguageLevelController.create);
};
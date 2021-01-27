const CategoryTemplateController = require("../../../app/http/controllers/v1/lookups/category_templates/CategoryTemplateController");

module.exports = (router) => {
    router.get("/categories_templates", CategoryTemplateController.index);
    router.post("/categories_templates", CategoryTemplateController.create);
    router.put("/categories_templates/:id(\\d+)", CategoryTemplateController.update);
    router.delete("/categories_templates/:id(\\d+)", CategoryTemplateController.delete);
    router.get("/categories_templates/with_templates", CategoryTemplateController.categoriesWithTemplates);
};
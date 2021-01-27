const CvTemplateCategory = require("../../../app/http/controllers/v1/lookups/templates_categories/CvTemplateCategoryController");

module.exports = (router) => {
    router.get("/cv_templates_categories", CvTemplateCategory.index);
    router.post("/cv_templates_categories", CvTemplateCategory.create);
    router.put("/cv_templates_categories/:id(\\d+)", CvTemplateCategory.update);
    router.delete("/cv_templates_categories/:id(\\d+)", CvTemplateCategory.delete);
    router.get("/cv_templates_categories/:categoryId(\\d+)/templates", CvTemplateCategory.categoryTemplates);
};
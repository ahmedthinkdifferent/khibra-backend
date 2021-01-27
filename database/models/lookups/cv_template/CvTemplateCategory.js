"use strict";
module.exports = (sequelize, Sequelize) => {
    const CvTemplateCategory = sequelize.define(
        "CvTemplateCategory",
        {
            name: {
                type: Sequelize.STRING
            },
        },
        {
            tableName: "CvTemplateCategories"
        }
    );
    CvTemplateCategory.associate = function (models) {
        // associations can be defined here
        CvTemplateCategory.hasMany(models.CvTemplate, {
           as:'templates',
           foreignKey:'categoryId'
        });
    };
    return CvTemplateCategory;
};

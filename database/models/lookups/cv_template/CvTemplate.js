"use strict";
module.exports = (sequelize, Sequelize) => {
    const CvTemplate = sequelize.define(
        "CvTemplate",
        {
            defaultColor: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: '#918be5'
            },
            url: {
                type: Sequelize.STRING,
                allowNull: true
            }
        },
        {
            tableName: "CvTemplates"
        }
    );
    CvTemplate.associate = function (models) {
        CvTemplate.belongsTo(models.CvTemplateCategory, {
            foreignKey: 'categoryId',
            as: 'category'
        });
    };
    return CvTemplate;
};

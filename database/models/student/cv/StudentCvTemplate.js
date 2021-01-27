"use strict";
module.exports = (sequelize, Sequelize) => {
    const StudentCvTemplate = sequelize.define(
        "StudentCvTemplate",
        {
            color: {
                type: Sequelize.STRING,
                allowNull: false,
            }
        },
        {
            tableName: "StudentCvTemplate"
        }
    );
    StudentCvTemplate.associate = function (models) {
        // associations can be defined here
        StudentCvTemplate.belongsTo(models.StudentCv, {
            foreignKey: "cvId",
            as: "cv"
        });

        StudentCvTemplate.belongsTo(models.CvTemplate, {
            foreignKey: "templateId",
            as: "template"
        });
    };
    return StudentCvTemplate;
};

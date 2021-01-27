"use strict";
module.exports = (sequelize, Sequelize) => {
    const StudentCvLanguage = sequelize.define(
        "StudentCvLanguage",
        {},
        {
            tableName: "StudentCvLanguages"
        }
    );
    StudentCvLanguage.associate = function (models) {
        // associations can be defined here
        StudentCvLanguage.belongsTo(models.StudentCv, {
            foreignKey: 'cvId',
            as: 'cv'
        });
        StudentCvLanguage.belongsTo(models.Language, {
            foreignKey: 'languageId',
            as: 'language'
        });
        StudentCvLanguage.belongsTo(models.LanguageLevel, {
            foreignKey: 'languageLevelId',
            as: 'languageLevel'
        })
    };
    return StudentCvLanguage;
};

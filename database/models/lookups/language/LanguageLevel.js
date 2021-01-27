"use strict";
module.exports = (sequelize, Sequelize) => {
    const LanguageLevel = sequelize.define(
        "LanguageLevel",
        {
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
        },
        {
            tableName: "LanguagesLevels"
        }
    );
    LanguageLevel.associate = function (models) {
        // associations can be defined here
    };
    return LanguageLevel;
};

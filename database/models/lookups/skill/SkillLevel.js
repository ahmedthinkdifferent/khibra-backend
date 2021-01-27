"use strict";
module.exports = (sequelize, Sequelize) => {
    const SkillLevel = sequelize.define(
        "SkillLevel",
        {
            name: {
                type: Sequelize.STRING,
                allowNull: false
            }
        },
        {
            tableName: "SkillsLevels"
        }
    );
    SkillLevel.associate = function (models) {
        // associations can be defined here
    };
    return SkillLevel;
};

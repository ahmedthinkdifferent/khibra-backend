"use strict";
module.exports = (sequelize, Sequelize) => {
    const Skill = sequelize.define(
        "Skill",
        {
            name: {
                type: Sequelize.STRING,
                allowNull: false
            }
        },
        {
            tableName: "Skills"
        }
    );
    Skill.associate = function (models) {
        // associations can be defined here
    };
    return Skill;
};

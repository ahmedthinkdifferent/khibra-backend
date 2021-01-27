"use strict";
module.exports = (sequelize, Sequelize) => {
    const StudentCvSkill = sequelize.define(
        "StudentCvSkill",
        {},
        {
            tableName: "StudentCvSkills"
        }
    );
    StudentCvSkill.associate = function (models) {
        // associations can be defined here
        StudentCvSkill.belongsTo(models.StudentCv, {
            foreignKey: 'cvId',
            as: 'cv'
        });
        StudentCvSkill.belongsTo(models.Skill, {
            foreignKey: 'skillId',
            as: 'skill'
        });
        StudentCvSkill.belongsTo(models.SkillLevel, {
            foreignKey: 'skillLevelId',
            as: 'skillLevel'
        })
    };
    return StudentCvSkill;
};

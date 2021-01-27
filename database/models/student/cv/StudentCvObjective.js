"use strict";
module.exports = (sequelize, Sequelize) => {
    const StudentCvObjective = sequelize.define(
        "StudentCvObjective",
        {
            objective: {
                type: Sequelize.TEXT,
                allowNull: false
            },
        },
        {
            tableName: "StudentCvObjective"
        }
    );
    StudentCvObjective.associate = function (models) {
        // associations can be defined here
        StudentCvObjective.belongsTo(models.StudentCv, {
            foreignKey: 'cvId',
            as: 'cv',
        });
    };
    return StudentCvObjective;
};

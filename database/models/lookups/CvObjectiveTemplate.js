"use strict";
module.exports = (sequelize, Sequelize) => {
    const StudentCvObjective = sequelize.define(
        "CvObjectiveTemplate",
        {
            objective: {
                type: Sequelize.TEXT,
                allowNull: false
            },
        },
        {
            tableName: "CvObjectiveTemplates"
        }
    );
    StudentCvObjective.associate = function (models) {
        // associations can be defined here
    };
    return StudentCvObjective;
};

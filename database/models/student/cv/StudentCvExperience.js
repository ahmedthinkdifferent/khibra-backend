"use strict";
module.exports = (sequelize, Sequelize) => {
    const StudentCvExperience = sequelize.define(
        "StudentCvExperience",
        {
            jobTitle: {
                type: Sequelize.STRING,
                allowNull: false
            },
            employer: {
                type: Sequelize.STRING,
                allowNull: false
            },
            city: {
                type: Sequelize.STRING,
                allowNull: false
            },
            startDate: {
                type: Sequelize.DATEONLY,
                allowNull: false
            },
            endDate: {
                type: Sequelize.DATEONLY,
                allowNull: false
            },
            description: {
                type: Sequelize.STRING(1000),
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        },
        {
            tableName: "StudentCvExperiences"
        }
    );
    StudentCvExperience.associate = function (models) {
        // associations can be defined here
        StudentCvExperience.belongsTo(models.StudentCv, {
            foreignKey: 'cvId',
            as: 'cv'
        })
    };
    return StudentCvExperience;
};

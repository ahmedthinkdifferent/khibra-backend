"use strict";
module.exports = (sequelize, Sequelize) => {
    const StudentCvEducation = sequelize.define(
        "StudentCvEducation",
        {
            school: {
                type: Sequelize.STRING,
                allowNull: false
            },
            degree: {
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
        },
        {
            tableName: "StudentCvEducations"
        }
    );
    StudentCvEducation.associate = function (models) {
        // associations can be defined here
        StudentCvEducation.belongsTo(models.StudentCv, {
            foreignKey: 'cvId',
            as: 'cv'
        });
    };
    return StudentCvEducation;
};

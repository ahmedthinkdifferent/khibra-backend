"use strict";
module.exports = (sequelize, Sequelize) => {
    const StudentCvCourse = sequelize.define(
        "StudentCvCourse",
        {
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            institution: {
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
            }
        },
        {
            tableName: "StudentCvCourses"
        }
    );
    StudentCvCourse.associate = function (models) {
        // associations can be defined here
        StudentCvCourse.belongsTo(models.StudentCv, {
            foreignKey: "cvId",
            as: 'cv'
        })
    };
    return StudentCvCourse;
};

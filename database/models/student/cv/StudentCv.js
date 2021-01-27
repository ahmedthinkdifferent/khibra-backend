"use strict";
module.exports = (sequelize, Sequelize) => {
    const StudentCv = sequelize.define(
        "StudentCv",
        {
            url: {
                type: Sequelize.STRING,
                allowNull: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: true
            },
            isCvCompleted: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
        },
        {
            tableName: "StudentCv"
        }
    );

    StudentCv.associate = function (models) {
        // associations can be defined here
        StudentCv.belongsTo(models.Student, {
            foreignKey: 'studentId',
            as: 'student',
        });

        StudentCv.hasOne(models.StudentCvTemplate, {
            foreignKey: 'cvId',
            as: 'template',
        });


        StudentCv.hasMany(models.StudentCvCourse, {
            foreignKey: 'cvId',
            as: 'courses'
        });

        StudentCv.hasMany(models.StudentCvEducation, {
            foreignKey: 'cvId',
            as: 'educations'
        });
        StudentCv.hasMany(models.StudentCvExperience, {
            foreignKey: 'cvId',
            as: 'experiences'
        });
        StudentCv.hasMany(models.StudentCvLanguage, {
            foreignKey: 'cvId',
            as: 'languages'
        });
        StudentCv.hasMany(models.StudentCvSkill, {
            foreignKey: 'cvId',
            as: 'skills'
        });
        StudentCv.hasOne(models.StudentCvObjective, {
            foreignKey: 'cvId',
            as: 'objective'
        })
    };
    return StudentCv;
};

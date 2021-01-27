"use strict";
module.exports = (sequelize, Sequelize) => {
    const StudentSavedJob = sequelize.define(
        "StudentSavedJob",
        {},
        {
            tableName: "StudentSavedJobs"
        }
    );
    StudentSavedJob.associate = function (models) {
        // associations can be defined here
        StudentSavedJob.belongsTo(models.Student, {
            foreignKey: 'studentId',
            as: "student"
        });
        StudentSavedJob.belongsTo(models.CompanyJob, {
            foreignKey: 'jobId',
            as: "job"
        })
    };
    return StudentSavedJob;
};

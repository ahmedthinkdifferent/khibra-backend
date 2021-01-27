"use strict";
module.exports = (sequelize, Sequelize) => {
    const JobApplication = sequelize.define(
        "JobApplication",
        {
            status: {
                type: Sequelize.STRING,
                allowNull: false
            }
        },
        {
            tableName: "JobApplications"
        }
    );
    JobApplication.associate = function (models) {
        // associations can be defined here
        JobApplication.belongsTo(models.CompanyJob, {
            foreignKey: 'jobId',
            as: 'job'
        });

        JobApplication.belongsTo(models.Student, {
            foreignKey: 'studentId',
            as: 'student'
        });
    };
    return JobApplication;
};

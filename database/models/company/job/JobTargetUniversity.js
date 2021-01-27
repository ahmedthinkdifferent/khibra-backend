"use strict";
module.exports = (sequelize, Sequelize) => {
    const JobTargetUniversity = sequelize.define(
        "JobTargetUniversity",
        {},
        {
            tableName: "JobTargetUniversities"
        }
    );
    JobTargetUniversity.associate = function (models) {
        JobTargetUniversity.belongsTo(models.CompanyJob, {
            foreignKey: 'jobId',
            as: 'job'
        });
        JobTargetUniversity.belongsTo(models.UniversityLookup, {
            foreignKey: 'universityId',
            as: 'university'
        });
    };
    return JobTargetUniversity;
};

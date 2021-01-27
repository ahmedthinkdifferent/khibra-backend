"use strict";
module.exports = (sequelize, Sequelize) => {
    const JobTargetMajor = sequelize.define(
        "JobTargetMajor",
        {},
        {
            tableName: "JobTargetMajors"
        }
    );
    JobTargetMajor.associate = function (models) {
        // associations can be defined here
        JobTargetMajor.belongsTo(models.CompanyJob, {
            foreignKey: 'jobId',
            as: 'job'
        });
        JobTargetMajor.belongsTo(models.MajorLookup, {
            foreignKey: 'majorId',
            as: 'major'
        });
    };
    return JobTargetMajor;
};

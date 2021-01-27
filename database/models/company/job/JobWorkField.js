"use strict";
module.exports = (sequelize, Sequelize) => {
    const JobWorkField = sequelize.define(
        "JobWorkField",
        {},
        {
            tableName: "JobWorkFields"
        }
    );
    JobWorkField.associate = function (models) {
        // associations can be defined here
        JobWorkField.belongsTo(models.CompanyJob, {
            foreignKey: 'jobId',
            as: 'job'
        });

        JobWorkField.belongsTo(models.WorkFieldLookup, {
            foreignKey: 'workFieldId',
            as: 'workField'
        });
    };
    return JobWorkField;
};

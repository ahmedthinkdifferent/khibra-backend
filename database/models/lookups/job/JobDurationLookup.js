"use strict";
module.exports = (sequelize, Sequelize) => {
    const JobDurationLookup = sequelize.define(
        "JobDurationLookup",
        {
            name: {
                type: Sequelize.STRING,
                allowNull: false
            }
        },
        {
            tableName: "JobDurationsLookup"
        }
    );
    JobDurationLookup.associate = function (models) {
        // associations can be defined here
    };
    return JobDurationLookup;
};

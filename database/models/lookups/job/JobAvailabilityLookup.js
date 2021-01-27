"use strict";
module.exports = (sequelize, Sequelize) => {
    const JobAvailabilityLookup = sequelize.define(
        "JobAvailabilityLookup",
        {
            name: {
                type: Sequelize.STRING,
                allowNull: false
            }
        },
        {
            tableName: "JobAvailabilityLookup"
        }
    );
    JobAvailabilityLookup.associate = function (models) {
        // associations can be defined here
    };
    return JobAvailabilityLookup;
};

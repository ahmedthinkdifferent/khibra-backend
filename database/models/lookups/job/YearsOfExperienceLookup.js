"use strict";
module.exports = (sequelize, Sequelize) => {
    const YearsOfExperienceLookup = sequelize.define(
        "YearsOfExperienceLookup",
        {
            name: {
                type: Sequelize.STRING,
                allowNull: false
            }
        },
        {
            tableName: "YearsOfExperienceLookup"
        }
    );
    YearsOfExperienceLookup.associate = function (models) {
        // associations can be defined here
    };
    return YearsOfExperienceLookup;
};

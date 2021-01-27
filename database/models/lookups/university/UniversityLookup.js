"use strict";
module.exports = (sequelize, Sequelize) => {
    const UniversityLookup = sequelize.define(
        "UniversityLookup",
        {
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            image: Sequelize.STRING,
            url: Sequelize.STRING
        },
        {
            tableName: "UniversitiesLookup"
        }
    );
    UniversityLookup.associate = function (models) {
        // associations can be defined here
    };
    return UniversityLookup;
};

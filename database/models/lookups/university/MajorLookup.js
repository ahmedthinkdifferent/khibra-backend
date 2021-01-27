"use strict";
module.exports = (sequelize, Sequelize) => {
    const MajorLookup = sequelize.define(
        "MajorLookup",
        {
            name: {
                type: Sequelize.STRING,
                allowNull: false
            }
        },
        {
            tableName: "MajorsLookup"
        }
    );
    MajorLookup.associate = function (models) {
        // associations can be defined here
    };
    return MajorLookup;
};

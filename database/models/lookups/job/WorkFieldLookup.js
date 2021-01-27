"use strict";
module.exports = (sequelize, Sequelize) => {
    const WorkFieldLookup = sequelize.define(
        "WorkFieldLookup",
        {
            name: {
                type: Sequelize.STRING,
                allowNull: false
            }
        },
        {
            tableName: "WorkFieldsLookup"
        }
    );
    WorkFieldLookup.associate = function (models) {
        // associations can be defined here
    };
    return WorkFieldLookup;
};

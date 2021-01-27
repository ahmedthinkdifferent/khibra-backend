"use strict";
module.exports = (sequelize, Sequelize) => {
    const Country = sequelize.define(
        "Country",
        {
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            }
        },
        {
            tableName: "Countries"
        }
    );
    Country.associate = function (models) {
        Country.hasMany(models.City, {
            foreignKey: "countryId",
            as: "cities",
        });
    };
    return Country;
};

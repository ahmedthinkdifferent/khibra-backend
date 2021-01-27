"use strict";
module.exports = (sequelize, Sequelize) => {
    const City = sequelize.define(
        "City",
        {
            name: {
                type: Sequelize.STRING,
                allowNull: false
            }
        },
        {
            tableName: "Cities"
        }
    );
    City.associate = function (models) {
        City.hasMany(models.Area, {
            foreignKey: "cityId",
            as: "areas",
        });
        City.belongsTo(models.Country, {
            foreignKey: "countryId",
            as: "country"
        });
    };
    return City;
};

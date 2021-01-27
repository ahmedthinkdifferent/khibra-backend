"use strict";
module.exports = (sequelize, Sequelize) => {
    const Area = sequelize.define(
        "Area",
        {
            name: {
                type: Sequelize.STRING,
                allowNull: false
            }
        },
        {
            tableName: "Areas"
        }
    );
    Area.associate = function (models) {
        Area.belongsTo(models.City, {
            foreignKey: "cityId",
            as: "city"
        });
    };
    return Area;
};

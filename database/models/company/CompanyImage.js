"use strict";
module.exports = (sequelize, Sequelize) => {
    const CompanyImage = sequelize.define(
        "CompanyImage",
        {
            title: Sequelize.STRING,
            image: {
                type: Sequelize.STRING,
                allowNull: false
            },
            location: Sequelize.STRING
        },
        {
            tableName: "CompanyImages"
        }
    );
    CompanyImage.associate = function (models) {
        CompanyImage.belongsTo(models.Company, {
            foreignKey: 'companyId',
            as: 'company'
        });
    };
    return CompanyImage;
};

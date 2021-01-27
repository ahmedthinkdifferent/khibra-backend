"use strict";
module.exports = (sequelize, Sequelize) => {
    const CompanyLocation = sequelize.define(
        "CompanyLocation",
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false
            },
            address: {
                type: Sequelize.STRING,
                allowNull: false
            },
            isHeadQuarter: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            jobsCount: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            hiringCount: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            employeesCount: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        },
        {
            tableName: "CompanyLocations"
        }
    );
    CompanyLocation.associate = function (models) {
        CompanyLocation.belongsTo(models.Country, {
            foreignKey: 'countryId',
            as: "country"
        });
        CompanyLocation.belongsTo(models.City, {
            foreignKey: "cityId",
            as: 'city'
        });
        CompanyLocation.belongsTo(models.Area, {
            foreignKey: 'areaId',
            as: 'area'
        });
        CompanyLocation.belongsTo(models.Company, {
            foreignKey: 'companyId',
            as: 'company'
        });

    };
    return CompanyLocation;
};

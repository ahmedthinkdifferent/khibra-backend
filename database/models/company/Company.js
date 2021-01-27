"use strict";
module.exports = (sequelize, Sequelize) => {
    const Company = sequelize.define(
        "Company",
        {
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            image: {
                type: Sequelize.STRING
            },
            workField: {
                type: Sequelize.STRING
            },
            locationsCount: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            hiringCount: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            jobsCount: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            appliersCount: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            employeesCount: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            about: {
                type: Sequelize.STRING
            },
            website: {
                type: Sequelize.STRING
            },
            facebook: {
                type: Sequelize.STRING
            },
            twitter: {
                type: Sequelize.STRING
            },
            instgram: {
                type: Sequelize.STRING
            },
        },
        {
            tableName: "Companies"
        }
    );
    Company.associate = function (models) {
        Company.hasMany(models.CompanyLocation, {
            foreignKey: 'companyId',
            as: "locations"
        });
        Company.hasMany(models.CompanyImage, {
            foreignKey: 'companyId',
            as: 'images'
        });
        Company.hasMany(models.CompanyDepartment, {
            foreignKey: 'companyId',
            as: 'departments'
        });
        Company.belongsTo(models.User, {
            foreignKey: 'userId',
            as: "user"
        })
    };
    return Company;
};

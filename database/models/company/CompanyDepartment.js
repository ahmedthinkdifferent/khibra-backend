"use strict";
module.exports = (sequelize, Sequelize) => {
    const CompanyDepartment = sequelize.define(
        "CompanyDepartment",
        {
            name: {
                type: Sequelize.STRING,
                allowNull: false
            }
        },
        {
            tableName: "CompanyDepartments"
        }
    );
    CompanyDepartment.associate = function (models) {
        // associations can be defined here
        CompanyDepartment.belongsTo(models.Company, {
            foreignKey: 'companyId',
            as: 'company'
        })
    };
    return CompanyDepartment;
};

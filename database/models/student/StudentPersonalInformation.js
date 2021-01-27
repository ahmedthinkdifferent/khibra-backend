"use strict";
module.exports = (sequelize, Sequelize) => {
    const StudentPersonalInformation = sequelize.define(
        "StudentPersonalInformation",
        {
            birthDate: {
                type: Sequelize.DATEONLY,
                allowNull: true,
            },
            address: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            city: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            zipCode: {
                type: Sequelize.STRING,
                allowNull: true,
            },
        },
        {
            tableName: "StudentPersonalInformation"
        }
    );
    StudentPersonalInformation.associate = function (models) {
        // associations can be defined here
        StudentPersonalInformation.belongsTo(models.Student, {
            foreignKey: "studentId",
            as: "student"
        });

        StudentPersonalInformation.belongsTo(models.Country, {
            foreignKey: "nationalityId",
            as: "nationality"
        });

        StudentPersonalInformation.belongsTo(models.Country, {
            foreignKey: "countryId",
            as: "country"
        });
    };
    return StudentPersonalInformation;
};

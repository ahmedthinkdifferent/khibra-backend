"use strict";
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define(
        "User",
        {
            email: Sequelize.STRING,
            password: Sequelize.STRING,
            passwordCode: Sequelize.STRING,
            type: Sequelize.STRING,
            phone: {
                type: Sequelize.STRING,
            },
            phoneCode: {
                type: Sequelize.STRING,
            },
            isVerified: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            isActive: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            isBlocked: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
        },
        {}
    );
    User.associate = function (models) {
        // associations can be defined here
        User.hasOne(models.Student, {
            foreignKey: "userId",
            as: 'student'
        });
        User.hasOne(models.Company, {
            foreignKey: 'userId',
            as: 'company'
        })
    };
    return User;
};

'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.createTable("Companies", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
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
            userId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Users',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                allowNull: false
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
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable("Companies");
    }
};

'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.createTable("CompanyLocations", {
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
            companyId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Companies',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            countryId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Countries',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'NO ACTION',
            },
            cityId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Cities',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'NO ACTION',
            },
            areaId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Areas',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'NO ACTION',
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
        });
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable("CompanyLocations")
    }
};

'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.createTable("CompanyJobs", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            title: {
                type: Sequelize.STRING(1000),
                allowNull: false
            },
            about: {
                type: Sequelize.STRING,
                allowNull: false
            },
            yearsOfExperienceId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'YearsOfExperienceLookup',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            jobAvailabilityId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'JobAvailabilityLookup',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            jobDurationId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'JobDurationsLookup',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            isGccNational: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            salary: {
                type: Sequelize.STRING,
            },
            isSalaryNeogitable: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            startDate: {
                type: Sequelize.DATE
            },
            endDate: {
                type: Sequelize.DATE
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
            workLocationId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'CompanyLocations',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
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
        return queryInterface.dropTable("CompanyJobs");
    }
};

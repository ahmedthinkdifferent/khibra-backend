"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("Students", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            firstName: {
                type: Sequelize.STRING,
            },
            midName: {
                type: Sequelize.STRING,
            },
            lastName: {
                type: Sequelize.STRING,
            },
            image: {
                type: Sequelize.STRING,
            },
            video: {
                type: Sequelize.STRING
            },
            universityEmail: {
                type: Sequelize.STRING,
            },
            backupEmail: {
                type: Sequelize.STRING,
            },
            phone: {
                type: Sequelize.STRING,
            },
            universityId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'UniversitiesLookup',
                    key: 'id',
                },
                allowNull: false,
                onUpdate: 'CASCADE',
                onDelete: 'No ACTION',
            },
            majorId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'MajorsLookup',
                    key: 'id',
                },
                allowNull: true,
                onUpdate: 'CASCADE',
                onDelete: 'No ACTION',
            },
            graduationScore: {
                type: Sequelize.STRING
            },
            graduationYear: {
                type: Sequelize.STRING
            },
            jobTitle: {
                type: Sequelize.STRING
            },
            yearsOfExperienceId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'YearsOfExperienceLookup',
                    key: 'id',
                },
                allowNull: true,
                onUpdate: 'CASCADE',
                onDelete: 'No ACTION',
            },
            availabilityId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'JobAvailabilityLookup',
                    key: 'id',
                },
                allowNull: true,
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            userId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Users',
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
                allowNull: true,
                onUpdate: 'CASCADE',
                onDelete: 'No ACTION',
            },
            cityId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Cities',
                    key: 'id',
                },
                allowNull: true,
                onUpdate: 'CASCADE',
                onDelete: 'No ACTION',
            },
            areaId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Areas',
                    key: 'id',
                },
                allowNull: true,
                onUpdate: 'CASCADE',
                onDelete: 'No ACTION',
            },
            address: {
                type: Sequelize.STRING
            },
            jobApplicationsCount: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            profileViewsCount: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            inboxMsgCount: {
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
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("Students");
    },
};

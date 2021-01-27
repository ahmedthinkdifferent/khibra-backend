'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.createTable("StudentCvLanguages", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            cvId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'StudentCv',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                allowNull: false
            },
            languageId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Languages',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            languageLevelId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'LanguagesLevels',
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
        return queryInterface.dropTable("StudentCvLanguages");
    }
};

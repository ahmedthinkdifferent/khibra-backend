'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.createTable("StudentCvSkills", {
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
            skillId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Skills',
                    key: 'id',
                },
                onUpdate: 'SET NULL',
                onDelete: 'SET NULL',
                allowNull: false
            },
            skillLevelId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'SkillsLevels',
                    key: 'id',
                },
                onUpdate: 'SET NULL',
                onDelete: 'SET NULL',
                allowNull: false
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
        return queryInterface.dropTable("StudentCvSkills");
    }
};

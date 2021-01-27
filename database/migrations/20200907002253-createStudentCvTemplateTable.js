"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("StudentCvTemplate", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            color: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            cvId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'StudentCv',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                allowNull:false
            },
            templateId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'CvTemplates',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                allowNull:false
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
        return queryInterface.dropTable("StudentCvTemplate");
    },
};

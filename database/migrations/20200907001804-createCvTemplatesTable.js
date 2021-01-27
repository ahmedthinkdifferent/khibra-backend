"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("CvTemplates", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            url: {
                type: Sequelize.STRING,
                allowNull: true
            },
            defaultColor: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: '#918be5'
            },
            categoryId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'CvTemplateCategories',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
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
        return queryInterface.dropTable("CvTemplates");
    },
};

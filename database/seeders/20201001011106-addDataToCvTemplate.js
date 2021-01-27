'use strict';
const DateTimeUtil = require('../../app/helpers/DateTimeUtil');
const DateFormat = require('../../app/helpers/model/DateFormat');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const now = DateTimeUtil.getCurrentDate(new DateFormat({amPm: false}));

        const templatesCategory = [{
            name: "General",
            createdAt: now,
            updatedAt: now
        }, {
            name: "Unique",
            createdAt: now,
            updatedAt: now
        }, {
            name: "Info",
            createdAt: now,
            updatedAt: now
        }, {
            name: "Powerful",
            createdAt: now,
            updatedAt: now
        }];
        const cats = await queryInterface.bulkInsert("CvTemplateCategories", templatesCategory, {returning: ['id']});
        for (let cat of cats) {
            await queryInterface.insert(null, "CvTemplates", {
                defaultColor: "#cccccc",
                categoryId: cat.id,
                createdAt: now,
                updatedAt: now
            })
        }
        return Promise.resolve();
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("CvTemplateCategories", null, {});
    }
};

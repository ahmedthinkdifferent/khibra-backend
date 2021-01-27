'use strict';
const DateTimeUtil = require('../../app/helpers/DateTimeUtil');
const DateFormat = require('../../app/helpers/model/DateFormat');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const now = DateTimeUtil.getCurrentDate(new DateFormat({amPm: false}));
        const levels = [{
            name: "A",
            createdAt: now,
            updatedAt: now
        },
            {
                name: "A+",
                createdAt: now,
                updatedAt: now
            },
            {
                name: "B",
                createdAt: now,
                updatedAt: now
            }];
        return queryInterface.bulkInsert("LanguagesLevels", levels);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("LanguagesLevels", null, {});
    }
};

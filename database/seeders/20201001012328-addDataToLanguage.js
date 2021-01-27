'use strict';
const DateTimeUtil = require('../../app/helpers/DateTimeUtil');
const DateFormat = require('../../app/helpers/model/DateFormat');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const now = DateTimeUtil.getCurrentDate(new DateFormat({amPm: false}));
        const langs = [{
            name: "Arabic",
            createdAt: now,
            updatedAt: now
        },
            {
                name: "English",
                createdAt: now,
                updatedAt: now
            },
            {
                name: "Italy",
                createdAt: now,
                updatedAt: now
            }];
        return queryInterface.bulkInsert("Languages", langs);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Languages", null, {});
    }
};

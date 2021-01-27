'use strict';
const DateTimeUtil = require('../../app/helpers/DateTimeUtil');
const DateFormat = require('../../app/helpers/model/DateFormat');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const now = DateTimeUtil.getCurrentDate(new DateFormat({amPm: false}));
        const data = [{
            name: "Less than year",
            createdAt: now,
            updatedAt: now
        }, {
            name: "Year to 3",
            createdAt: now,
            updatedAt: now
        }, {
            name: "Open time",
            createdAt: now,
            updatedAt: now
        }];
        return queryInterface.bulkInsert("JobDurationsLookup", data);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("JobDurationsLookup", null, {});
    }
};

'use strict';
const DateTimeUtil = require('../../app/helpers/DateTimeUtil');
const DateFormat = require('../../app/helpers/model/DateFormat');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const now = DateTimeUtil.getCurrentDate(new DateFormat({amPm: false}));
        const data = [{
            name: "Full Time",
            createdAt: now,
            updatedAt: now
        }, {
            name: "Part Time",
            createdAt: now,
            updatedAt: now
        }, {
            name: "Freelance",
            createdAt: now,
            updatedAt: now
        }];
        return queryInterface.bulkInsert("JobAvailabilityLookup", data);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("JobAvailabilityLookup", null, {});
    }
};

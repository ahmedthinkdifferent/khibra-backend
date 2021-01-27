'use strict';
const DateTimeUtil = require('../../app/helpers/DateTimeUtil');
const DateFormat = require('../../app/helpers/model/DateFormat');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const now = DateTimeUtil.getCurrentDate(new DateFormat({amPm: false}));
        const data = [{
            name: "Agriculture",
            createdAt: now,
            updatedAt: now
        }, {
            name: "Accounting",
            createdAt: now,
            updatedAt: now
        }, {
            name: "Software engineering",
            createdAt: now,
            updatedAt: now
        }];
        return queryInterface.bulkInsert("WorkFieldsLookup", data);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("WorkFieldsLookup", null, {});
    }
};

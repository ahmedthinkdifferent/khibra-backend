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
        },
            {
                name: "+1 year",
                createdAt: now,
                updatedAt: now
            },
            {
                name: "+3 year",
                createdAt: now,
                updatedAt: now
            },
            {
                name: "+5 year",
                createdAt: now,
                updatedAt: now
            }];
        return queryInterface.bulkInsert("YearsOfExperienceLookup", data);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("YearsOfExperienceLookup", null, {});
    }
};

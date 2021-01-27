'use strict';
const DateTimeUtil = require('../../app/helpers/DateTimeUtil');
const DateFormat = require('../../app/helpers/model/DateFormat');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const now = DateTimeUtil.getCurrentDate(new DateFormat({amPm: false}));
        const data = [{
            name: "Civil Engineer",
            createdAt: now,
            updatedAt: now
        },
            {
                name: "Computer Science",
                createdAt: now,
                updatedAt: now
            },
            {
                name: "Information System",
                createdAt: now,
                updatedAt: now
            }];
        return queryInterface.bulkInsert("MajorsLookup", data);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("MajorsLookup", null, {});
    }
};

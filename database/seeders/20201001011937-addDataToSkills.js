'use strict';
const DateTimeUtil = require('../../app/helpers/DateTimeUtil');
const DateFormat = require('../../app/helpers/model/DateFormat');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const now = DateTimeUtil.getCurrentDate(new DateFormat({amPm: false}));
        const skills = [{
            name: "Word",
            createdAt: now,
            updatedAt: now
        },
            {
                name: "Excel",
                createdAt: now,
                updatedAt: now
            },
            {
                name: "Windows",
                createdAt: now,
                updatedAt: now
            }, {
                name: "Linux",
                createdAt: now,
                updatedAt: now
            }];
        return queryInterface.bulkInsert("Skills", skills);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Skills", null, {});
    }
};

'use strict';
const DateTimeUtil = require('../../app/helpers/DateTimeUtil');
const DateFormat = require('../../app/helpers/model/DateFormat');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const now = DateTimeUtil.getCurrentDate(new DateFormat({amPm: false}));
        const universities = [{
            name: "Algonquin College",
            createdAt: now,
            updatedAt: now
        },
            {
                name: "American International University",
                createdAt: now,
                updatedAt: now
            },
            {
                name: "Arab Open University ",
                createdAt: now,
                updatedAt: now
            },
            {
                name: "Kuwait University ",
                createdAt: now,
                updatedAt: now
            }];
        return  queryInterface.bulkInsert("UniversitiesLookup", universities);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("UniversitiesLookup", null, {});
    }
};

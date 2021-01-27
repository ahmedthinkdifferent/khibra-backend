'use strict';
const DateTimeUtil = require('../../app/helpers/DateTimeUtil');
const DateFormat = require('../../app/helpers/model/DateFormat');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const now = DateTimeUtil.getCurrentDate(new DateFormat({amPm: false}));
        const countriesData = [{
            name: "Egypt",
            createdAt: now,
            updatedAt: now
        },
            {
                name: "Qatar",
                createdAt: now,
                updatedAt: now
            }
            , {
                name: "Kuwait",
                createdAt: now,
                updatedAt: now
            }];
        const countries = await queryInterface.bulkInsert("Countries", countriesData, {returning: ['id']});

        const citiesData = [{
            name: "Cairo",
            countryId: countries[0].id,
            createdAt: now,
            updatedAt: now
        },
            {
                name: "Alexendria",
                countryId: countries[0].id,
                createdAt: now,
                updatedAt: now
            },
            {
                name: "Al Khawr",
                countryId: countries[1].id,
                createdAt: now,
                updatedAt: now
            },
            {
                name: "Doha",
                countryId: countries[1].id,
                createdAt: now,
                updatedAt: now
            },
            {
                name: "Kuwait",
                countryId: countries[2].id,
                createdAt: now,
                updatedAt: now
            },
            {
                name: "Dasman",
                countryId: countries[0].id,
                createdAt: now,
                updatedAt: now
            }]
        const cities = await queryInterface.bulkInsert("Cities", citiesData, {returning: ['id']});

        const areasData = [{
            name: "Giza",
            cityId: cities[0].id,
            createdAt: now,
            updatedAt: now
        }, {
            name: "Shatbi",
            cityId: cities[1].id,
            createdAt: now,
            updatedAt: now
        },
            {
                name: "Qatar1",
                cityId: cities[2].id,
                createdAt: now,
                updatedAt: now
            },
            {
                name: "Doha",
                cityId: cities[3].id,
                createdAt: now,
                updatedAt: now
            },
            {
                name: "Kuwait",
                cityId: cities[4].id,
                createdAt: now,
                updatedAt: now
            },
            {
                name: "Dasman",
                cityId: cities[5].id,
                createdAt: now,
                updatedAt: now
            }];
        const areas = await queryInterface.bulkInsert("Areas", areasData, {returning: ['id']});
        return Promise.resolve();
    },

    down: async (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.bulkDelete("Countries", null, {}),
            queryInterface.bulkDelete("Cities", null, {}),
            queryInterface.bulkDelete("Areas", null, {})
        ]);
    }
};

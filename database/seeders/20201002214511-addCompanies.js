'use strict';
const DateTimeUtil = require('../../app/helpers/DateTimeUtil');
const DateFormat = require('../../app/helpers/model/DateFormat');
const bcrypt = require("bcrypt");
const config = require("../../config/config.json");
const models = require('../models');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const now = DateTimeUtil.getCurrentDate(new DateFormat({amPm: false}));
        const data = [{
            user: {
                email: "company1@gmail.com",
                password: await bcrypt.hash("123456", config.bcryptOption),
                type: "Company",
                phone: "01012345671",
                createdAt: now,
                updatedAt: now
            },
            company: {
                name: "Google",
                workField: "Software and search engine",
                about: "Software company help users to execute search query to search for anything in browser",
                website: "https://google.com",
                locationsCount: 1,
                createdAt: now,
                updatedAt: now
            },
            location: {
                title: "Kuwait",
                address: "Kuwait tower",
                isHeadQuarter: true,
                createdAt: now,
                updatedAt: now
            }
        },
            {
                user: {
                    email: "company2@gmail.com",
                    password: await bcrypt.hash("123456", config.bcryptOption),
                    type: "Company",
                    phone: "01012345672",
                    createdAt: now,
                    updatedAt: now
                },
                company: {
                    name: "Facebook",
                    workField: "Social chant with people",
                    about: "Software company that help users to know chat with others.",
                    website: "https://facebook.com",
                    locationsCount: 1,
                    createdAt: now,
                    updatedAt: now
                },
                location: {
                    title: "Head Quarter office",
                    address: "Kuwait tower",
                    isHeadQuarter: true,
                    createdAt: now,
                    updatedAt: now
                }
            }];

        for (let dataItem of data) {
            const user = await models.User.create(dataItem.user);
            dataItem.company.userId = user.id;
            const company = await models.Company.create(dataItem.company);
            const country = await models.Country.findOne({
                where: {
                    name: 'Kuwait'
                },
                include: [{
                    association: 'cities',
                    include: [{
                        association: 'areas'
                    }]
                }]
            }, {
                raw: true
            });
            dataItem.location.companyId = company.id;
            dataItem.location.countryId = country.id;
            dataItem.location.cityId = country.cities[0].id;
            dataItem.location.areaId = country.cities[0].areas[0].id;
            await queryInterface.bulkInsert("CompanyLocations", [dataItem.location]);
        }

        return Promise.resolve();
    }, down: async (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.bulkDelete("CompanyLocations", null, {}),
            queryInterface.bulkDelete("Companies", null, {}),
            queryInterface.bulkDelete("CompanyLocations", {
                type: "Company"
            }, {})
        ]);
    }
}

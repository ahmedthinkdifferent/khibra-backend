'use strict';
const models = require('../models');
const DateTimeUtil = require('../../app/helpers/DateTimeUtil');
const DateFormat = require('../../app/helpers/model/DateFormat');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const companies = await models.Company.findAll({}, {raw: true});
        const yearsOfExperience = await models.YearsOfExperienceLookup.findAll({}, {raw: true});
        const availabilities = await models.JobAvailabilityLookup.findAll({}, {raw: true});
        const durations = await models.JobDurationLookup.findAll({}, {raw: true});
        const now = DateTimeUtil.getCurrentDate(new DateFormat({amPm: false}));

        for (let company of companies) {
            const locations = await models.CompanyLocation.findAll({
                where: {
                    companyId: company.id
                }
            }, {raw: true});
            const jobs = [{
                title: "Software engineer",
                about: "    As Softxpert is a place where people can work, perform, develop & succeed together, we are hiring self-driven, passionate, talented & experienced PHP Software Engineer.\n" +
                    "    Exploit the opportunity of working in a friendly & flexible environment.\n" +
                    "    Be you, use your distinctive competencies & join our team.",
                yearsOfExperienceId: yearsOfExperience[0].id,
                jobAvailabilityId: availabilities[0].id,
                jobDurationId: durations[0].id,
                isGccNational: true,
                salary: "1000 $",
                isSalaryNeogitable: false,
                startDate: now,
                companyId: company.id,
                workLocationId: locations[0].id,
                minQualifications: "Bachelor degree in computer engineering or related field\n" +
                    "Familiar with working in an environment where products have to be delivered to specific time-scales",
                preferredQualifications: "    Bachelor degree in computer engineering or related field\n" +
                    "    Familiar with working in an environment where products have to be delivered to specific time-scales\n" +
                    "    Knowledge in PHP development\n" +
                    "    Excellent knowledge of OOP\n" +
                    "    Ability to work under minimum supervision\n" +
                    "    Strong multi-tasking skills and analysis skills\n" +
                    "    Excellent knowledge of SDLC\n" +
                    "    Familiar with GIT or SVN\n" +
                    "    Excellent problem solving and analytical skills\n" +
                    "    Familiarity with PHP Frameworks is a plus",
                createdAt: now,
                updatedAt: now
            }, {
                title: "Quality Control engineer",
                about: "We are looking for a Software Engineering Director to work collaboratively with our Product Director, and both report directly to our CEO & Founder.\n" +
                    "We have 6 Directors in our company, its the highest executive level, and we have 6 Directors (Sales, Marketing, Finance, Operations, Product, & Technology), and all work together as one executive team in the same room, and they dire the strategy of the company.\n" +
                    "The Engineering Director is responsible for Engineering Excellence, & Delivery of Roadmap Commitments. The Engineering team has 3 teams, 1 DevOps / Infra & 2 cross-functional teams, each lead by an Engineering Manager. Each cross-functional unit has:\n" +
                    "Backend Engineers (Engineering)\n" +
                    "Frontend Engineer (Engineering)",
                yearsOfExperienceId: yearsOfExperience[1].id,
                jobAvailabilityId: availabilities[1].id,
                jobDurationId: durations[1].id,
                isGccNational: false,
                salary: "2000 $",
                isSalaryNeogitable: true,
                minQualifications: "Backend Engineers (Engineering)\n" +
                    "Frontend Engineer (Engineering)\n" +
                    "iOS Engineer (Engineering)",
                preferredQualifications: "Transforming a monolith product to a microservices architecture\n" +
                    "    International Software Development experience\n" +
                    "    Front End Engineering\n" +
                    "    Mobile Development\n" +
                    "    Git\n" +
                    "    Symfony\n" +
                    "    MongoDB\n" +
                    "    AWS (Amazon Cloud)\n" +
                    "    Elastic Search\n" +
                    "    Docker\n" +
                    "    Jenkins"
                , companyId: company.id,
                workLocationId: locations[0].id,
                createdAt: now,
                updatedAt: now
            }];
            await queryInterface.bulkInsert("CompanyJobs", jobs);
        }
        return Promise.resolve();
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("CompanyJobs", null, {});
    }
};

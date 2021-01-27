'use strict';
const DateTimeUtil = require('../../app/helpers/DateTimeUtil');
const DateFormat = require('../../app/helpers/model/DateFormat');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const now = DateTimeUtil.getCurrentDate(new DateFormat({amPm: false}));

        const templates = [{
            objective: "Seeking a position as a clinical practice assistant for a health maintenance organization, " +
                "utilizing my award-winning writing, research, and leadership skills.",
            createdAt: now,
            updatedAt: now
        },
            {
                objective: "Search engine optimization position where I can use my SEO skills and experience to increase site traffic" +
                    " and search engine placement, applying my 15 years of IT experience.",
                createdAt: now,
                updatedAt: now
            }
        ];
        return queryInterface.bulkInsert("CvObjectiveTemplates", templates);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("CvObjectiveTemplates", null, {});
    }
};

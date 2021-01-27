'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn("CompanyJobs", "minQualifications", {
                type: Sequelize.STRING(1000)
            }),
            queryInterface.addColumn("CompanyJobs", "preferredQualifications", {
                type: Sequelize.STRING(1000)
            })
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        return Promise.all([queryInterface.removeColumn("CompanyJobs", "minQualifications"),
            queryInterface.removeColumn("CompanyJobs", "preferredQualifications")
        ]);
    }
};

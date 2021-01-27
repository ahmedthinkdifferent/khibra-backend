'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.addColumn("StudentCv", "isCvCompleted", {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        })
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.removeColumn("StudentCv", "isCvCompleted");
    }
};

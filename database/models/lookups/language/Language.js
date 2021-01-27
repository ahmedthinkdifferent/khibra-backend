"use strict";
module.exports = (sequelize, Sequelize) => {
  const Language = sequelize.define(
    "Language",
    {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
    },
    {
      tableName:"Languages"
    }
  );
  Language.associate = function (models) {
    // associations can be defined here
  };
  return Language;
};

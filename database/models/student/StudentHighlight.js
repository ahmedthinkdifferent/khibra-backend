"use strict";
module.exports = (sequelize, Sequelize) => {
    const StudentHighlight = sequelize.define(
        "StudentHighlight",
        {
            title: {
                type: Sequelize.STRING,
                allowNull: false
            }
        },
        {
            tableName: "StudentHighlights"
        }
    );
    StudentHighlight.associate = function (models) {
        StudentHighlight.belongsTo(models.Student, {
            foreignKey: 'studentId',
            as: "student"
        })
    };
    return StudentHighlight;
};

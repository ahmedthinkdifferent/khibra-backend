"use strict";
module.exports = (sequelize, Sequelize) => {
    const StudentWorkField = sequelize.define(
        "StudentWorkField",
        {},
        {
            tableName: "StudentWorkFields"
        }
    );
    StudentWorkField.associate = function (models) {
        StudentWorkField.belongsTo(models.WorkFieldLookup, {
            foreignKey: 'fieldId',
            as: 'field'
        });

        StudentWorkField.belongsTo(models.Student, {
            foreignKey: 'studentId',
            as: 'student'
        });
    };
    return StudentWorkField;
};

"use strict";
module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define(
        "Student",
        {
            firstName: Sequelize.STRING,
            midName: Sequelize.STRING,
            lastName: Sequelize.STRING,
            image: Sequelize.STRING,
            video: Sequelize.STRING,
            universityEmail: Sequelize.STRING,
            backupEmail: Sequelize.STRING,
            phone: Sequelize.STRING,
            userId: Sequelize.INTEGER,
            graduationScore: Sequelize.STRING,
            graduationYear: Sequelize.STRING,
            jobTitle: Sequelize.STRING,
            address: Sequelize.STRING,
            jobApplicationsCount: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            profileViewsCount: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            inboxMsgCount: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },

        },
        {
            tableName: 'Students'
        }
    );
    Student.associate = function (models) {
        // associations can be defined here
        Student.belongsTo(models.User, {
            foreignKey: "userId",
            as: "user",
            onDelete: "CASCADE",
        });

        Student.belongsTo(models.UniversityLookup, {
            foreignKey: 'universityId',
            as: "university"
        });
        Student.belongsTo(models.MajorLookup, {
            foreignKey: 'majorId',
            as: "major"
        });
        Student.hasOne(models.StudentCv, {
            foreignKey: 'studentId',
            as: 'cv'
        });

        Student.belongsTo(models.Country, {
            foreignKey: 'countryId',
            as: 'country'
        });
        Student.belongsTo(models.City, {
            foreignKey: "cityId",
            as: "city"
        });
        Student.belongsTo(models.Area, {
            foreignKey: 'areaId',
            as: "area"
        });
        Student.hasOne(models.StudentPersonalInformation, {
            foreignKey: 'studentId',
            as: 'personalInformation'
        });

        Student.belongsTo(models.JobAvailabilityLookup, {
            foreignKey: 'availabilityId',
            as: 'availability'
        });
        Student.hasMany(models.StudentHighlight, {
            foreignKey: 'studentId',
            as: 'highlights'
        });
        Student.hasMany(models.StudentWorkField, {
            foreignKey: 'studentId',
            as: "fields"
        });
        Student.belongsTo(models.YearsOfExperienceLookup, {
            foreignKey: "yearsOfExperienceId",
            as: "yearsOfExperience"
        });
        Student.hasMany(models.StudentSavedJob, {
            foreignKey: 'studentId',
            as: "savedJobs"
        });
        Student.hasMany(models.JobApplication, {
            foreignKey: 'studentId',
            as: 'jobApplications'
        })
    };

    Student.prototype.fullName = function () {
        return this.firstName + ' ' + this.midName + " " + this.lastName;
    };

    return Student;
};

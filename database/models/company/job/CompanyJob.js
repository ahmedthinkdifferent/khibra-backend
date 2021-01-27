"use strict";
module.exports = (sequelize, Sequelize) => {
    const CompanyJob = sequelize.define(
        "CompanyJob",
        {
            title: {
                type: Sequelize.STRING,
                allowNull: false
            },
            about: {
                type: Sequelize.STRING(1000),
                allowNull: false
            },
            isGccNational: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            salary: {
                type: Sequelize.STRING,
            },
            isSalaryNeogitable: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            minQualifications: {
                type: Sequelize.STRING(1000)
            },
            preferredQualifications: {
                type: Sequelize.STRING(1000)
            },
            startDate: {
                type: Sequelize.DATE
            },
            endDate: {
                type: Sequelize.DATE
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        },
        {
            tableName: "CompanyJobs"
        }
    );
    CompanyJob.associate = function (models) {
        // associations can be defined here
        CompanyJob.belongsTo(models.YearsOfExperienceLookup, {
            foreignKey: 'yearsOfExperienceId',
            as: 'yearsOfExperience'
        });

        CompanyJob.belongsTo(models.JobAvailabilityLookup, {
            foreignKey: 'jobAvailabilityId',
            as: 'availability'
        });
        CompanyJob.belongsTo(models.JobDurationLookup, {
            foreignKey: 'jobDurationId',
            as: "duration"
        });
        CompanyJob.belongsTo(models.Company, {
            foreignKey: 'companyId',
            as: 'company'
        });
        CompanyJob.belongsTo(models.CompanyLocation, {
            foreignKey: 'workLocationId',
            as: 'workLocation'
        });
        CompanyJob.hasMany(models.JobWorkField, {
            foreignKey: 'jobId',
            as: 'workFields'
        });
        CompanyJob.hasMany(models.JobTargetUniversity, {
            foreignKey: 'jobId',
            as: 'universities'
        });
        CompanyJob.hasMany(models.JobTargetMajor, {
            foreignKey: 'jobId',
            as: 'majors'
        });
        CompanyJob.hasMany(models.JobApplication, {
            foreignKey: 'jobId',
            as: 'jobApplications'
        })
    };
    return CompanyJob;
};

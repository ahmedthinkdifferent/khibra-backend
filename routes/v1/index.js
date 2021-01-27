const {Router} = require("express");
const router = Router();
// users
require('./user/users')(router);
require('./user/phone_verification')(router);
require('./user/forget_password')(router);
//lookups
require('./lookups/languages')(router);
require('./lookups/languages_levels')(router);
require('./lookups/skills')(router);
require('./lookups/skills_levels')(router);
require('./lookups/countries')(router);
require('./lookups/cv_templates_categories')(router);
require('./lookups/categories_templates')(router);
require('./lookups/cv_objective_templates')(router);
require('./lookups/universities')(router);
require('./lookups/work_fields')(router);
require('./lookups/years_of_experience')(router);
require('./lookups/majors')(router);
require('./lookups/job_types')(router);
require('./lookups/job_durations')(router);
// student and student cv.
require('./student/students')(router);
require('./student/cv/objectives')(router);
require('./student/cv/personal_information')(router);
require('./student/cv/courses')(router);
require('./student/cv/educations')(router);
require('./student/cv/experiences')(router);
require('./student/cv/languages')(router);
require('./student/cv/skills')(router);
require('./student/cv/cv')(router);
//file uploader.
require('./uploader/file_uploader')(router);
// company api.
require('./company/company_profile')(router);
require('./company/company_images')(router);
// student jobs
require('./student/jobs/jobs')(router);
module.exports = router;
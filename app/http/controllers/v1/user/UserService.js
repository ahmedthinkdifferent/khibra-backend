const bcrypt = require("bcrypt");
const config = require("../../../../../config/config.json");
const jwtService = require("../../../../helpers/JwtService");
const models = require("../../../../../database/models");
const BadRequestException = require("../../../exceptions/BadRequestException");
const LocalizationHelper = require("../../../../helpers/LocalizationHelper");
const UserTypeConst = require("../../../../constants/UserTypeConst");
const ApiResponseCode = require("../../../../constants/ApiResponseCode");
const EmailIntegration = require('../../../integrations/EmailIntegration');


class UserService {
    static async register(userData) {
        // check if user exists with email before.
        const userWithSameEmail = await models.User.findOne(
            {
                where: {
                    email: userData.email,
                    type: userData.type,
                },
                attributes: ["id"],
            },
            {
                raw: true,
            }
        );

        if (userWithSameEmail) {
            throw new BadRequestException(
                LocalizationHelper.translate("user_exists_before")
            );
        }

        // create user
        const user = models.User.build(userData);
        user.password = await bcrypt.hash(userData.password, config.bcryptOption);
        await user.save();
        // send welcome email to user.
        await EmailIntegration.sendRegisterWelcomeMail(user.email);
    }

    static async login(userData) {
        let user = await models.User.findOrFail({
            where: {
                email: userData.email,
            },
        });

        //check password
        const isCorrectPassword = await bcrypt.compare(
            userData.password,
            user.password
        );
        if (!isCorrectPassword) {
            throw new BadRequestException(
                LocalizationHelper.translate("user_not_exists")
            );
        }

        user = user.toJSON();
        delete user.password;
        user.token = jwtService.generateJwt(user);
        await UserService.loadUserDetailsBasedOnType(user);
        return user;
    }

    static async loadUserDetailsBasedOnType(user) {
        if (user.type === UserTypeConst.STUDENT) {
            user.student = await models.Student.findOne(
                {
                    where: {
                        userId: user.id
                    },
                    include: [
                        {
                            association: 'personalInformation'
                        }, {
                            association: 'cv',
                            include: [{
                                association: 'template',
                                include: ['template']
                            }, {
                                association: 'courses'
                            }, {
                                association: 'educations'
                            }, {
                                association: 'experiences'
                            }, {
                                association: 'languages',
                                include: [{
                                    association: "language"
                                }, {
                                    association: 'languageLevel'
                                }]
                            }, {
                                association: 'skills',
                                include: [{
                                    association: "skill"
                                }, {
                                    association: "skillLevel"
                                }]
                            }, {
                                association: 'objective'
                            }]
                        }]
                },
                {raw: true}
            );
        } else if (user.type === UserTypeConst.COMPANY) {
            user.company = await models.Company.findOne(
                {
                    where: {
                        userId: user.id
                    }
                },
                {
                    raw: true,
                }
            );
        }
        //TODO get company and university info.
    }
}

module.exports = UserService;

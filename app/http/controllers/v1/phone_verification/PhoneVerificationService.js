const UserTypeConst = require('../../../../constants/UserTypeConst');
const models = require("../../../../../database/models");
const BadRequestException = require('../../../exceptions/BadRequestException');
const LocalizationHelper = require('../../../../helpers/LocalizationHelper');
const RandomTextGenerator = require('../../../../helpers/RandomTextGenerator');
const SmsIntegration = require('../../../integrations/SmsIntegration');

class PhoneVerificationService {


    static async sendCode(phone, email, type) {
        const user = await PhoneVerificationService.findUser({
            email,
            type
        });
        if (user.isVerified) {
            throw new BadRequestException(LocalizationHelper.translate("phone_verified_before"));
        } else {
            // send code to user phone .
            user.phone = phone;
            user.phoneCode = RandomTextGenerator.generateNumber();
            await SmsIntegration.send(user.phone, user.phoneCode);
            await user.save();
        }
    }

    static async verifyCode(phone, code) {
        const user = await PhoneVerificationService.findUser({phone});
        if (user.isVerified) {
            throw new BadRequestException(LocalizationHelper.translate("phone_verified_before"));
        } else {
            // check code.
            if (user.phoneCode !== code) {
                throw new BadRequestException(LocalizationHelper.translate("invalid_verification_code"))
            }
            await user.update({
                isVerified: true,
                phoneCode: null
            });
            // remove all users who has same phone and not verified .
            await models.User.destroy({
                where: {
                    id: {
                        [models.Sequelize.Op.not]: user.id
                    },
                    [models.Sequelize.Op.or]: {
                        phone: user.phone,
                        email: user.email
                    },
                    type: user.type
                }
            });
        }
    }

    static async findUser(where) {
        return await models.User.findOrFail({
            where
        });
    }
}

module.exports = PhoneVerificationService;
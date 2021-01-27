const validationSchema = require('./uploadValidationSchema');
const DataValidator = require('../../../../helpers/DataValidator');
const UserTypeConst = require('../../../../constants/UserTypeConst');
const BadRequestException = require('../../../exceptions/BadRequestException');
const LocalizationHelper = require('../../../../helpers/LocalizationHelper');
const FileSaver = require('../../../../helpers/FileHelper');
const models = require('../../../../../database/models');
const ApiResponse = require('../../../../helpers/ApiResponse');


class FileUploaderController {


    static async upload(req, res, next) {
        try {
            DataValidator.validate(req.body, validationSchema.upload);
            const user = req.user;
            // check if logined user has same type of image he want to upload
            FileUploaderController.checkUserCanUploadImageFromType(user.type, req.body.type);
            if (!req.files || !req.files.image) {
                // user not uploaded image.
                throw new BadRequestException(LocalizationHelper.translate("image_not_uploaded"));
            }
            const filePath = await FileSaver.saveFile(req.files.image, "images");
            await FileUploaderController.saveImageInDb(filePath, user);
            return ApiResponse.send(req, res, "uploadedFile", {path: filePath});

        } catch (e) {
            return next(e);
        }
    }


    // utility method not rest api method.
    static checkUserCanUploadImageFromType(userType, imageToUploadType) {
        if (imageToUploadType === 'student' && userType !== UserTypeConst.STUDENT) {
            throw new BadRequestException(LocalizationHelper.translate("cannot_perform_operation"))
        }
    }

    /**
     *
     * @param filePath file path of saved image.
     * @param user logined user to save image in his data in db.
     */
    static async saveImageInDb(filePath, user) {
        if (user.type === UserTypeConst.STUDENT) {
            const student = await models.Student.findOrFail({
                where: {
                    userId: user.id
                }
            });
            student.image = filePath;
            await student.save();
        }
    }
}

module.exports = FileUploaderController;
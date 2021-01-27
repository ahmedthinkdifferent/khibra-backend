const path = require('path');
const uuid = require('uuid-random');
var fs = require('fs');

class FileHelper {


    static async saveFile(file, subFolderPath = "images") {
        let filename = uuid();
        filename += path.extname(file.name); // uploaded file extension.
        const folder = path.resolve('storage/uploads/' + subFolderPath);
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder, {recursive: true});
        }
        await file.mv(folder + "/" + filename);
        return `storage/uploads/${subFolderPath}/${filename}`;
    }

    static async deleteFile(filePath) {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }
}

module.exports = FileHelper;
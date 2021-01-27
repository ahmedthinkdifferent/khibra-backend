const Student = require("./student");
const models = require("../../../../../database/models");
const create = async (data) => {
    return models.Student.create(data);
};

const getDetails = async (userId) => {
    //find user from database
    const student = await models.Student.findOrFail({
        where: {
            userId: userId,
        },
    });
    // create student default cv.
    const cvData = {};
    return student;
};

module.exports = {
    create,
    getDetails,
};

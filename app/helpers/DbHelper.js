const models = require("../../database/models");
const ModelNotFoundException = require('../../app/http/exceptions/ModelNotFoundException');
const ModelExsistsBeforeException = require('../../app/http/exceptions/ModelExsistsBeforeException');

class DbHelper {


    static async checkRowExistence(model, whereClause, attributes = ['id']) {
        const item = await model.findOne({
            where: whereClause,
            attributes: attributes
        }, {
            raw: true
        });
        if (!item) {
            throw new ModelNotFoundException(model.name + " not exists");
        }
    }

    static async checkRowNotExistence(model, whereClause, attributes = ['id']) {
        const item = await model.findOne({
            where: whereClause,
            attributes: attributes
        }, {
            raw: true
        });
        if (item) {
            throw new ModelExsistsBeforeException(model.name + " exists before");
        }
    }
}

module.exports = DbHelper;
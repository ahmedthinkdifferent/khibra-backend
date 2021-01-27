"use strict";
const fs = require("fs");
const path = require("path");
const ModelNotFoundException = require('../../app/http/exceptions/ModelNotFoundException');
const Sequelize = require("sequelize");
const envConfigs = require("../config/config");

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = envConfigs[env];
const db = {};

let sequelize;
if (config.url) {
    sequelize = new Sequelize(config.url, config);
} else {
    sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config
    );
}


const files = [];
const sortDir = maniDir => {
    const folders = [];
    const CheckFile = filePath => fs.statSync(filePath).isFile();
    const sortPath = dir => {
        fs
            .readdirSync(dir)
            .filter(file => file.indexOf(".") !== 0 && file !== "index.js")
            .forEach(res => {
                const filePath = path.join(dir, res);
                if (filePath.indexOf("Schema") === -1) {
                    if (CheckFile(filePath)) {
                        files.push(filePath);
                    } else {
                        folders.push(filePath);
                    }
                }
            });
    };
    folders.push(maniDir);
    let i = 0;
    do {
        sortPath(folders[i]);
        i += 1;
    } while (i < folders.length);
};
sortDir(__dirname);


files.forEach((file) => {
    const model = require(file)(
        sequelize,
        Sequelize.DataTypes
    );
    db[model.name] = model;
    model.findByPkOrFail = async (pk, options = {}) => {
        const item = await model.findByPk(pk, options);
        if (!item) {
            throw new ModelNotFoundException(`${model.name} with id ${pk} not exists`);
        }
        return item;
    };

    model.findOrFail = async (criteria, options = {}) => {
        const item = await model.findOne(criteria, options);
        if (!item) {
            throw new ModelNotFoundException(model.name + " not exists");
        }
        return item;
    }
});

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
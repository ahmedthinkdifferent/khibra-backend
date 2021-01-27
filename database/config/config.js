require("dotenv").config();

module.exports = {
    development: {
        url: process.env.DATABASE_URL,
        dialect: "postgres",
    },
    test: {
        url: process.env.DATABASE_URL,
        dialect: "postgres",
    },
    production: {
        url: process.env.DATABASE_URL,
        dialect: "postgres",
    },
    localhost: {
        url: process.env.DATABASE_URL,
        dialect: 'postgres',
        operatorsAliases: 0,
        pool: {
            max: 30,
            min: 0,
            idle: 20000,
            acquire: 40000,
            evict: 20000,
        },
    },
};

const {transports, createLogger, format} = require('winston');
const fs = require('fs');
const path = require('path');
const logPath = path.resolve(__dirname) + "/../../storage/logs";
if (!fs.existsSync(logPath)) {
    fs.mkdirSync(logPath);
}

const formatter = format.printf(info => {
    if (info.stack) {
        return `${info.timestamp} ${info.level}: ${info.message} ${info.stack}`;
    }
    return `${info.timestamp} ${info.level}: ${info.message}`;
});

const logger = createLogger({
    format: format.combine(
        format.timestamp(),
        format.prettyPrint(),
        format.splat(),
        format.errors({stack: true}),
        formatter
    ),
    transports: [
        new transports.File({filename: `${logPath}/error.log`, level: 'error'}),
        new transports.File({filename: `${logPath}/activity.log`, level: 'debug'}),
        new transports.Console({
            level: 'debug',
            format: format.combine(
                format.colorize()
            )
        })
    ],
    exitOnError: false,
});

class Logger {


    static debug(data) {
        logger.debug(data);
    }

    static error(exception) {
        logger.error(exception);
    }

}

module.exports = Logger;
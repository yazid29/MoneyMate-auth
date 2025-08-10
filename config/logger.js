const winston = require("winston");
const { combine, timestamp, printf, colorize, align } = winston.format;

const logMinimumLevel = process.env.LOG_LEVEL || "info";
console.log(logMinimumLevel);

const logger = winston.createLogger({
    level: logMinimumLevel,
    levels: winston.config.npm.levels,
    format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD hh:mm:ss.SSS A" }),
        winston.format.json(),
        // winston.format.errors({ stack: true }),
        // align(),
        colorize(),
        printf(({ timestamp, level, message, metadata, context }) => {
            let msg = `${timestamp} [${level}]: ${message}`;
            if (context) {
                msg += ` [context]: ${JSON.stringify(context)}`;
            };
            if (metadata) {
                msg += ` [metadata]: ${JSON.stringify(metadata)}`;
            };
            return msg;
        })
    ),
    transports: [
        new winston.transports.Console(),
        // new winston.transports.File({ filename: 'loginfo.log' })
    ],
});

module.exports = logger;
import winston from "winston";

const logger = winston.createLogger({
    transports:[
        new winston.transports.Console({level: "info"}),
        new winston.transports.File({filename: './errors.log', level: "info"})
    ]
})

export const addLogger = (req, res, next) => {
    req.logger = logger;
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
    next();
}
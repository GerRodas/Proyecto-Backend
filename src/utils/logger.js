import winston from "winston";

const logger = winston.createLogger({
    transports:[
        new winston.transport.Console({level: "info"})
    ]
})

export const addLogger = (req, res, next) => {
    req.logger = logger;
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString}`)
    next();
}
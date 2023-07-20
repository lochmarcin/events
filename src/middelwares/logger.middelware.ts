import { v4 as uuidv4 } from 'uuid'
import winston from 'winston'
// var moment = require('moment');
// const { format } = require('sequelize/types/utils');
// var today = moment().format('YYYY-MM-DD');

// function customFileFormatter(options) {
//     return options.timestamp() + ' [' + options.level.toUpperCase() + '] ' + uuid() + ' ' + (undefined !== options.message ? options.message : '') +
//         (options.meta && Object.keys(options.meta).length ? JSON.stringify(options.meta) : '');
// }

const logger = winston.createLogger({
    // format: winston.format.json(),
    format: winston.format.combine(
        // res.locals.logger,
        winston.format.json()
    ),
    defaultMeta: { service: 'events-service' },
    transports: [
        new winston.transports.Console(),
    ],
});

function loggerMiddelware(req, res, next) {
    const requestId = uuidv4()
    console.log(requestId)
    res.locals.logger = requestId

    console.log(res.locals.logger)
    res.set('X-Request-Id', requestId)

    return next()
}

export {
    loggerMiddelware,
    logger
}
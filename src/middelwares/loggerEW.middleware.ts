import express, { Request, Response } from "express";

import { createLogger, transports, format, level } from 'winston'
// import { combine, timestamp, label, json, prettyPrint } from format
import { CustomRequest } from "../interfaces/customRequest.interface"

import { v4 as uuidv4 } from 'uuid'
import { NextFunction } from 'express'

const logFolder = './logs/'



const loggerTrasports = [
    new transports.File({
        level: 'info',
        filename: `${logFolder}info.log`
    }),
    new transports.File({
        level: 'warn',
        filename: `${logFolder}warning.log`
    }),
    new transports.File({
        level: 'error',
        filename: `${logFolder}Error.log`
    }),
    new transports.Console()
]


// if (process.env.NODE_ENV !== 'production') {
//     loggerTrasports.push(
//         new transports.Console()
//     )
// }



let logger = createLogger({
    transports: loggerTrasports,
    format: format.combine(
        format.timestamp(),
        format.json(),
        format.prettyPrint()
    )
})


function loggerMiddelware(req: CustomRequest, res: Response, next: NextFunction): void {
    const requestId = uuidv4()

    req.RequestId = requestId

    res.set('X-Request-Id', requestId)

    return next()
}

// const requestLogger = createLogger({
//     levels: winston.config.syslog.levels,
//     transports: requestLoggerTrasports,
//     format: combine(
//         label({reqID: "uuidv4()"}),
//         timestamp(),
//         json(),
//         prettyPrint()
//     )
// })

export {
    logger,
    // requestLogger,
    loggerMiddelware
}
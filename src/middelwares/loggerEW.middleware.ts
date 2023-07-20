import winston from 'winston'
import express, { Request, Response } from "express";

import { createLogger, transports, format, level } from 'winston'
// import { combine, timestamp, label, json, prettyPrint } from format
import { v4 as uuidv4 } from 'uuid'
import { NextFunction } from 'express'

let reqID
const logFolder = './logs/'

const loggerTrasports = [
    new transports.File({
        level: 'info',
        filename: `${logFolder}logs.log`
    }),
    new transports.File({
        level: 'error',
        filename: `${logFolder}Error.log`
    }),
    new transports.Console()
]


const requestLoggerTrasports = [
    new transports.File({
        level: 'warn',
        filename: `${logFolder}RequestWarning.log`
    }),
    new transports.File({
        level: 'error',
        filename: `${logFolder}RequestError.log`
    })
]

if (process.env.NODE_ENV !== 'production') {
    loggerTrasports.push(
        new transports.Console()
    )

    requestLoggerTrasports.push(
        new transports.File({
            level: 'info',
            filename: `${logFolder}RequestInfo.log`
        })
    )
}



let logger = createLogger({
    transports: loggerTrasports,
    format: format.combine(
        // format.label({label : `${reqID}`}),
        format.label({ label: uuidv4() }),
        format.timestamp(),
        format.json(),
        format.prettyPrint()
    )
})

function loggerMiddelware(req: Request, res: Response, next: NextFunction) {
    const requestId = uuidv4()
    // console.log(requestId)
    reqID = requestId
    console.log(reqID)

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
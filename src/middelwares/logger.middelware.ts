// import { v4 as uuidv4 } from 'uuid'
// import winston from 'winston'
// import express, { Request, Response, NextFunction } from "express";


// const logger = winston.createLogger({
//     format: winston.format.combine(
//         // winston.format.json()
//     ),
//     defaultMeta: { service: 'events-service' },
//     transports: [
//         new winston.transports.Console(),
//     ],
// });

// function loggerMiddelware(req: Request, res: Response, next: NextFunction): void {
//     const requestId = uuidv4()
//     console.log(requestId)
//     res.locals.logger = requestId

//     console.log(res.locals.logger)
//     res.set('X-Request-Id', requestId)

//     return next()
// }

// export {
//     loggerMiddelware,
//     logger
// }
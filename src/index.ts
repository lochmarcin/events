import express, {Request,  Response, NextFunction } from "express"
import bodyParser from "body-parser"
import router from "./router"
// import { loggerMiddelware, logger } from "./middelwares/logger.middelware"
import { connectionTest } from './helpers/connection.helper'
import { errorHendlerMiddleware } from "./middelwares/errorHendler"
import expressWinston from "express-winston"
import { logger, loggerMiddelware } from './middelwares/loggerEW.middleware'

const app = express()
app.use(loggerMiddelware)
// app.use((req, res, next) => { loggerMiddelware(res) })

require('dotenv').config()

connectionTest()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// app.use(loggerMiddelware)

console.log(process.env.PORT)

app.listen(process.env.PORT, () => {
    logger.info(`App running at port: ${process.env.PORT}`)
})

// DATABASE CONNECTION TEST
// db.connectionTest()

// app.use(expressWinston.logger({
//     winstonInstance: logger,
//     statusLevels: true
// }))
// expressWinston.requestWhitelist.push('body')
// expressWinston.responseWhitelist.push('body')
// expressWinston.responseWhitelist.push('headers')




// app.use(expressWinston.errorLogger({
//     winstonInstance: logger,
// }))


app.use("/", router)

app.use((req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(404)
})



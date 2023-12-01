import express, { Request, Response, NextFunction } from "express"
import bodyParser from "body-parser"
import router from "./router"
// import { loggerMiddelware, logger } from "./middelwares/logger.middelware"
import { connectionTest } from './helpers/connection.helper'
import { errorHendlerMiddleware } from "./middelwares/errorHendler"
import expressWinston from "express-winston"
import { logger, loggerMiddelware } from './middelwares/loggerEW.middleware'

import { checkRedisConnection } from './helpers/redis.connection.helper'

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


checkRedisConnection()

app.use("/", router)

app.use((req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(404)
})



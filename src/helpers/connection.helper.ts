// const Sequelize = require('sequelize')
// const sequelize = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
//     host: 'localhost',
//     dialect: 'postgres',
//     timezone: 'Europe/Warsaw'
// });

import { logger } from "../middelwares/logger.middelware"
// import { db, env } from '../migrations/models/index'
import db  from '../migrations_ts/index'


const connectionTest = async () => {

    try {
        await db.sequelize.authenticate();
        logger.info(`Connection has been established successfully.`)
        // console.log('Connection has been established successfully.');
        // logger.info(`Using environment: ${env}`)
        // console.log("Using environment: " + env)
    } catch (error) {
        logger.error(`Unable to connect to the database: ${error}`);
    }
}

export { connectionTest }